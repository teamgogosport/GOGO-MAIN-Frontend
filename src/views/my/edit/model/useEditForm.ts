import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { PatchStudentInfo } from '@/shared/types/my/edit';
import { formatEditData } from './formatEditData';

export const useEditForm = () => {
  const { register, handleSubmit, setValue, watch } =
    useForm<PatchStudentInfo>();
  const [selectedSex, setSelectedSex] = useState<'MALE' | 'FEMALE' | null>(
    null,
  );
  const [filtered, setFiltered] = useState<boolean>(false);

  const name = watch('name');
  const grade = watch('grade');
  const classNumber = watch('classNumber');
  const studentNumber = watch('studentNumber');
  const sex = watch('sex');

  const isDisabled = !name || !grade || !classNumber || !studentNumber || !sex;

  const onSubmit = (data: PatchStudentInfo) => {
    const formattedData = formatEditData(data, selectedSex, filtered);
    console.log('전송 데이터:', JSON.stringify(formattedData, null, 2));
  };

  const onError = (errors: FieldErrors<PatchStudentInfo>) => {
    console.log('제출에러:', errors);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    selectedSex,
    setSelectedSex,
    filtered,
    setFiltered,
    isDisabled,
    onSubmit,
    onError,
  };
};
