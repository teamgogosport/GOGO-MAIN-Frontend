import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CommunityCreateFormData } from '@/shared/types/community/create';
import { postCommunity } from '../api/postCommunity';

export const useCreateCommunityMutation = (stageId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommunityCreateFormData) => postCommunity(stageId, data),
    onSuccess: () => {
      toast.success('커뮤니티 생성이 완료되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['communityList', stageId],
        exact: false,
      });

      router.push(`/community/${stageId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
