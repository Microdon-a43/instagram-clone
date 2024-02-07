import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { checkMediaFiles } from '@/shared/lib/checkMediaFiles';
import { uploadMedia } from '@/shared/lib/uploadMedia';
import { Form, HStack, Icon, Input, VStack } from '@/shared/ui';
import { Button, message } from 'antd';
import { useState, type ChangeEvent, type FC } from 'react';
import {
  EditPostFormNames,
  usePostEditFormSchema,
  type EditPostFromValues
} from '../../model/schema/usePostEditFormSchema';
import { updatePost } from '../../model/service/updatePost';
import { type IPost } from '../../model/types/post';
import styles from './EditPost.module.scss';

interface EditPostProps {
  post: IPost;
  onClose?: () => void;
}

export const EditPost: FC<EditPostProps> = ({ post, onClose }) => {
  const { media } = post;
  const {
    register,
    reset,
    handleSubmit,
    watch,
    isLoading,
    isSubmitting,
    errors,
    isValid
  } = usePostEditFormSchema(post);

  const [newMediaFiles, setNewMediaFiles] = useState(media);
  const dispatch = useAppDispatch();

  const handleMediaFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const { err, newMedia } = checkMediaFiles(files);
    if (err) return await message.error(err);
    const res = await uploadMedia(newMedia);
    const newArray = [...newMediaFiles, ...res];
    setNewMediaFiles(newArray);
  };

  const onDeleteMediaFile = (i: number) => {
    const newFiles = newMediaFiles.filter((_, index) => index !== i);
    setNewMediaFiles(newFiles);
  };

  const onSubmit = async (data: EditPostFromValues) => {
    if (newMediaFiles.length <= 0) return await message.error('Выберите фото!');
    await dispatch(
      updatePost({ media: newMediaFiles, content: data.content, post })
    );
    reset();
    setNewMediaFiles([]);
    onClose();
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={16} align="end">
          <Input
            placeholder={EditPostFormNames.CONTENT}
            {...register(EditPostFormNames.CONTENT)}
            value={watch(EditPostFormNames.CONTENT)}
            error={errors?.content?.message}
            className={styles.textarea}
            textarea
          />

          {newMediaFiles.length > 0 && (
            <HStack gap={6} align="center">
              {newMediaFiles.map((file, i) => (
                <div className={styles.mediaFile}>
                  {file.url.includes('jpg') ? (
                    <div key={i}>
                      <img src={file.url} />
                      <span
                        onClick={() => {
                          onDeleteMediaFile(i);
                        }}
                      >
                        &times;
                      </span>
                    </div>
                  ) : (
                    <div key={i}>
                      <video src={file.url} />
                      <span
                        onClick={() => {
                          onDeleteMediaFile(i);
                        }}
                      >
                        &times;
                      </span>
                    </div>
                  )}
                </div>
              ))}
              <HStack className={styles.addFile} align="center">
                <label htmlFor="newFile">
                  <input
                    type="file"
                    id="newFile"
                    onChange={handleMediaFiles}
                    multiple
                  />
                  <Icon type="Plus" />
                </label>
              </HStack>
            </HStack>
          )}
          {newMediaFiles.length === 0 && (
            <HStack>
              <label htmlFor="files" className={styles.media}>
                <HStack gap={12}>
                  <input
                    type="file"
                    id="files"
                    accept="image/*, video/*"
                    onChange={handleMediaFiles}
                    multiple
                  />
                  <Icon type="Clip" />
                  <Icon type="Camera" />
                </HStack>
              </label>
            </HStack>
          )}

          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid && isSubmitting}
          >
            Изменить
          </Button>
        </VStack>
      </Form>
    </>
  );
};
