import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { IoIosCloseCircle } from 'react-icons/io'
import { useRouter } from 'next/router'

import InputField from '@/components/form/InputField'
import Button from '@/components/common/Button'
import { AdminLayout } from '@/components/layout'
import SwitchButton from '@/components/admin/SwitchButton'
import SelectField from '@/components/form/SelectField'
import { createLoadingSelector } from '@/store/loaderSlice'
import { createPost, CREATE_POST, updatePost, UPDATE_POST, getPostDetailById, selectPostDetail, clearPostDetail } from '@/store/postSlice'
import { getListCategories, selectListCategories } from '@/store/categorySlice'
import { uploadImage, clearUploadedImage, deleteImage } from '@/store/uploadSlice'
import { uploadService } from '@/services/uploadService'
import { stringHelpers } from '@/helpers'
import { ADMIN_ROUTES, CATEGORY_TYPE } from '@/constants'

const PostEditor = dynamic(
  () => import('@/components/admin/editor/PostEditor'),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>
  }
)

const CreatePostPage = () => {
  const router = useRouter()
  const { id } = router.query
  const isEdit = !!id
  const textAction = isEdit ? 'Update' : 'Create'
  const postDetail = useSelector(selectPostDetail)

  const dispatch = useDispatch()
  const loadingSelector = createLoadingSelector([CREATE_POST, UPDATE_POST])
  const isLoading = useSelector((state) => loadingSelector(state.loader))
  const [highlight, setHighlight] = useState(false)
  const [published, setPublished] = useState(true)
  const categoriesFetch = useSelector(selectListCategories)
  const [categories, setCategories] = useState([])
  const [editor, setEditor] = useState(null)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)
  const [deletingThumbnail, setDeletingThumbnail] = useState(false)
  const [editorReady, setEditorReady] = useState(false)
  const fileInputRef = useRef(null)

  const schema = object({
    title: string().required('Please enter your title'),
    description: string().required('Please enter your description'),
    thumbnail: object({
      url: string().required(),
      public_id: string().required()
    }).nullable().notRequired(),
    category: object({
      id: string().required(),
      name: string().required(),
      slug: string().required()
    })
      .nullable()
      .required('Please choose category')
      .test(
        'is-selected',
        'Please choose category',
        (value) => value && value.id
      )
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      thumbnail: null,
      category: {
        id: '',
        name: '',
        slug: ''
      }
    }
  })

  const { reset } = methods

  const handleUploadThumbnail = async (file) => {
    if (!file) return

    setUploadingThumbnail(true)

    try {
      const uploaded = await dispatch(
        uploadImage(file)
      ).unwrap()

      methods.setValue('thumbnail', uploaded)
    } finally {
      setUploadingThumbnail(false)
    }
  }

  const handleDeleteThumbnail = async () => {
    const thumbnail = methods.watch('thumbnail')
    if (!thumbnail?.public_id) return

    setDeletingThumbnail(true)

    try {
      await dispatch(
        deleteImage(thumbnail.public_id)
      ).unwrap()

      methods.setValue('thumbnail', null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setDeletingThumbnail(false)
    }
  }

  const onSubmit = async(data) => {
    try {
      const dataPost = {
        title: data.title,
        description: data.description,
        slug: stringHelpers.slugify(data.title),
        content: editor?.getData() || '',
        thumbnail: data.thumbnail,
        category: data.category,
        published,
        highlight
      }
      if (isEdit) {
        await dispatch(updatePost({
          postId: postDetail._id,
          ...dataPost
        })).unwrap()

        toast.success('Post updated!')
        router.replace(ADMIN_ROUTES.LIST_POST_PAGE)
      } else {
        await dispatch(createPost(dataPost)).unwrap()
        toast.success('Post created!')
        reset({
          title: '',
          description: '',
          thumbnail: null,
          category: {
            id: '',
            name: '',
            slug: ''
          }
        })

        if (editorReady && editor?.getData() !== '') {
          editor.setData('')
        }
        setPublished(true)
        setHighlight(false)
      }
    } catch (error) {
      toast.error(error?.message)
    }
  }

  useEffect(() => {
    const options = (categoriesFetch || []).map(item => ({
      label: item.name,
      value: item._id,
      name: item._name
    }))
    setCategories(options)
  }, [categoriesFetch])

  useEffect(() => {
    dispatch(getListCategories({ type: CATEGORY_TYPE.POST }))
  }, [])

  useEffect(() => {
    if (!id) {
      dispatch(clearPostDetail())
      reset()
      setHighlight(false)
      setPublished(true)
      return
    }

    dispatch(getPostDetailById({ id }))
      .unwrap()
      .catch(() => {
        router.replace('/404')
      })

    return () => {
      dispatch(clearPostDetail())
    }
  }, [id, dispatch, router, reset])

  useEffect(() => {
    if (!editor || !editorReady) return

    // CREATE MODE
    if (!isEdit) {
      reset({
        title: '',
        description: '',
        thumbnail: null,
        category: { id: '', name: '', slug: '' }
      })

      setHighlight(false)
      setPublished(true)

      if (editor.getData() !== '') {
        editor.setData('')
      }

      return
    }

    // EDIT MODE
    if (postDetail?._id === id) {
      reset({
        title: postDetail.title || '',
        description: postDetail.description || '',
        thumbnail: postDetail.thumbnail || null,
        category: postDetail.category || { id: '', name: '', slug: '' }
      })
      setHighlight(!!postDetail.highlight)
      setPublished(!!postDetail.published)
      editor.setData(postDetail.content || '')
    }
  }, [isEdit, postDetail, id, editor, editorReady, reset])

  return (
    <>
      <Head>
        <title>Admin - {textAction} Post</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <AdminLayout>
        <section>
          <h1 className='mb-6 text-3xl font-bold'>{textAction} Post</h1>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 mb-4'>
                <div className='flex items-center'>
                  <span className='text-light-coffee mr-2'>Highlight</span>
                  <SwitchButton checked={highlight} onChange={() => setHighlight(!highlight)} />
                </div>
                <div className='flex items-center'>
                  <span className='text-light-coffee mr-2'>Published</span>
                  <SwitchButton checked={published} onChange={() => setPublished(!published)} />
                </div>
              </div>

              <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
                <InputField
                  name='title'
                  label='Title'
                  labelClasses='text-left block text-light-coffee'
                  inputClasses='bg-white'
                  required
                />
                <InputField
                  name='description'
                  label='Description'
                  labelClasses='text-left block text-light-coffee'
                  inputClasses='bg-white'
                  required
                />
              </div>

              <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
                <div>
                  <label className='block text-sm mb-1 text-light-coffee'>Thumbnail</label>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    className='w-full p-3 border border-light-coffee bg-white rounded-lg cursor-pointer'
                    onChange={(e) => handleUploadThumbnail(e.target.files[0])}
                    disabled={uploadingThumbnail || !!methods.watch('thumbnail')}
                  />

                  {uploadingThumbnail && (
                    <p className='text-lg mt-2 text-light-coffee'>Uploading...</p>
                  )}

                  {methods.watch('thumbnail') && !uploadingThumbnail && (
                    <div className='relative w-40 mt-3'>
                      <img
                        src={methods.watch('thumbnail').url || methods.watch('thumbnail')}
                        alt='thumbnail'
                        className={`w-40 h-40 object-cover rounded ${
                          deletingThumbnail ? 'opacity-50' : ''
                        }`}
                      />

                      {deletingThumbnail ? (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/30 rounded'>
                          <p className='text-white text-sm'>Deleting...</p>
                        </div>
                      ) : (
                        <button
                          type='button'
                          onClick={handleDeleteThumbnail}
                          className='absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100'
                        >
                          <IoIosCloseCircle size={22} className='cursor-pointer' />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <SelectField
                  name='category'
                  label='Category'
                  placeholder='Select category...'
                  options={categoriesFetch.map(item => ({
                    label: item.name,
                    value: item._id,
                    slug: item.slug
                  }))}
                  returnObject
                  mapValue={(opt) => ({
                    id: opt.value,
                    name: opt.label,
                    slug: opt.slug
                  })}
                  required
                />
              </div>

              <div>
                <p>Content</p>
                <PostEditor
                  key={id || 'create'}
                  setEditor={setEditor}
                  setEditorReady={setEditorReady}
                />
              </div>

              <Button loading={isLoading} type='submit' size='sm' variant='secondary' className='hover:bg-light-coffee hover:text-white uppercase mt-4'>{isLoading ? 'Saving...' : isEdit ? 'Update Post' : 'Save Post'}</Button>
            </form>
          </FormProvider>
        </section>
      </AdminLayout>
    </>
  )
}

export default CreatePostPage