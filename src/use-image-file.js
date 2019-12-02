import compose from './compose';
import useObjectURL from './use-object-url';
import useImageData from './use-image-data';

const useImageFile = compose(useImageData, useObjectURL);

export default useImageFile;
