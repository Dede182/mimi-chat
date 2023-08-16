


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gos = (result : any)=>{
    if (result && result.status === 200 && result.data) {
           
        return result.data;
    }
    if(result && result.status === 403 && result.data)
    {
    throw new Error(result.data.message);
    }

    throw new Error("Something went wrong!! Please try again later");
    
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const eos = (error : any)=>{
    if(error instanceof Error)
    {
        throw new Error(error.message);
    }
}