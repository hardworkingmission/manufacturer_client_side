import { useQuery } from 'react-query';

const useParts = () => {
    const {data:parts,isLoading,error,refetch}=useQuery('parts',()=>(
        fetch('http://localhost:5000/parts')
            .then(res=>res.json())
    ))
    return [parts,isLoading,error,refetch]
};

export default useParts