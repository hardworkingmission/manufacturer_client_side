import { useQuery } from 'react-query';

const useParts = () => {
    const {data:parts,isLoading:queryLoading,error:queryError,refetch:queryRefetch}=useQuery('parts',()=>(
        fetch('http://localhost:5000/parts')
            .then(res=>res.json())
    ))
    return [parts,queryLoading,queryError,queryRefetch]
};

export default useParts