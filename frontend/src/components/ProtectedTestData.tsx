import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TestData } from "../types/test";
import { supabase } from "../config/supabase";
import { DynamicTable } from "./DynamicTable";
import { CreateEntryForm } from "./CreateEntryForm";



const ProtectedTestData = () => {

    const [data, setData] = useState<TestData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);    
    
    const fetchProtectedData = async () => {
        try{
            const {data:protectedData,error} = await supabase
            .from ("protected_data")
            .select("*");

            if(error) throw error;
            setData(protectedData);
        }
        catch(error){
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
        finally{
            setLoading(false);
        }
    };

    useEffect (() => {
        fetchProtectedData();
    }, []);

    if (loading) {return <div>Loading...</div>};
    if (error) {return <div>Error: {error}</div>};

    return(
        <Box sx={{ p: 3 }}>
            <Typography variant="h2" gutterBottom>
                Protected Test Data. This data is only available to authenticated users.
            </Typography>
            <CreateEntryForm onSuccessfulSubmit={fetchProtectedData} />
            {data.length > 0 
            ? (<DynamicTable data={data} />) 
            : (<div>No protected data available. Please create some</div>)}

        </Box>
    )
};

export default ProtectedTestData;

//using supabse to get data
//useEffect is used because we want to call it once when rendering the component