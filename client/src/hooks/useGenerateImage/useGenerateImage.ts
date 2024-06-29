import { useMutation } from '@tanstack/react-query';
import { generateImageApi } from '../../api/dall-e';

const useGenerateImage = () => {
  return useMutation({
    mutationFn: (prompt: string) => generateImageApi(prompt),
  });
};

export default useGenerateImage;
