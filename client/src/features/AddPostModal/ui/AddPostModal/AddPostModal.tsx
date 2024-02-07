import { createPost } from '@/entities/PostCard';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { checkMediaFiles } from '@/shared/lib/checkMediaFiles';
import { Form, HStack, Icon, Input, Text, VStack } from '@/shared/ui';
import { Button, message, Modal } from 'antd';
import React, { type ChangeEvent, useState, type FC } from 'react';
import {
  AddModalFormNames,
  type AddModalFormValues,
  useAddModalFormSchema
} from '../../model/schema/useAddModalFormSchema';
import styles from './AddPostModal.module.scss';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPostModal: FC<AddPostModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    isValid,
    isSubmitting,
    errors
  } = useAddModalFormSchema();
  const dispatch = useAppDispatch();

  const [media, setMedia] = useState([]);

  const handleMediaFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const { err, newMedia } = checkMediaFiles(files);
    if (err) return message.error(err);
    setMedia([...media, ...newMedia]);
  };

  const onDeleteMediaFile = (index: number) => {
    const newMediaFiles = [...media];
    newMediaFiles.splice(index, 1);
    setMedia(newMediaFiles);
  };

  const onSubmit = async (data: AddModalFormValues) => {
    if (media.length <= 0) return await message.error('Выберите фото!');
    await dispatch(createPost({ media, content: data.content }));
    reset();
    setMedia([]);
    onClose();
  };
  return (
    <>
      <Modal
        title={
          <Text fw={700} size={18} color="default">
            Добавить пост
          </Text>
        }
        footer={false}
        open={isOpen}
        onCancel={onClose}
        centered
      >
        <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={16} align="end">
            <Input
              placeholder="Введите текст"
              {...register(AddModalFormNames.CONTENT)}
              value={watch(AddModalFormNames.CONTENT)}
              error={errors?.content?.message}
              className={styles.textarea}
              textarea
            />

            {media.length > 0 && (
              <HStack gap={4}>
                {media.map((file, i) => (
                  <div className={styles.mediaFile}>
                    {file.type.includes('image') ? (
                      <div key={i}>
                        <img src={URL.createObjectURL(file)} />
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
                        <video src={URL.createObjectURL(file)} />
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
              </HStack>
            )}

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
              <HStack justify="end">
                <Text
                  as="span"
                  size={12}
                  color={errors?.content ? 'error' : 'default'}
                >
                  {watch(AddModalFormNames.CONTENT).length} / 200
                </Text>
              </HStack>
            </HStack>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Добавить
            </Button>
          </VStack>
        </Form>
      </Modal>
    </>
  );
};
