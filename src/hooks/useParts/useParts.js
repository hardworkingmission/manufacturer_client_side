import { useQuery } from 'react-query';

const useParts = () => {
    const {data:parts,isLoading:queryLoading,error:queryError,refetch:queryRefetch}=useQuery('parts',()=>(
        fetch('https://gentle-lake-87574.herokuapp.com/parts')
            .then(res=>res.json())
    ))
    return [parts,queryLoading,queryError,queryRefetch]
};

export default useParts