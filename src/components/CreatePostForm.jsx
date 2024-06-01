// src/components/CreatePostForm.js

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
// import { useHistory } from 'react-router-dom';

const schema = z.object({
  title: z.string().min(2),
  content: z.string().min(5),
  thumbnail: z.instanceof(File).optional(),
  main_image: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

const CreatePostForm = () => {
  const { user } = useContext(AuthContext);
  // const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.thumbnail[0]) {
      formData.append('thumbnail', data.thumbnail[0]);
    }
    if (data.main_image[0]) {
      formData.append('main_image', data.main_image[0]);
    }
    if (data.images.length) {
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // history.push('/');
    } catch (error) {
      console.error('Create post error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register('title')} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div>
        <label>Content</label>
        <textarea {...register('content')} />
        {errors.content && <span>{errors.content.message}</span>}
      </div>
      <div>
        <label>Thumbnail</label>
        <input type="file" {...register('thumbnail')} />
      </div>
      <div>
        <label>Main Image</label>
        <input type="file" {...register('main_image')} />
      </div>
      <div>
        <label>Images</label>
        <input type="file" {...register('images')} multiple />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
