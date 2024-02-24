import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewProductPage() {
    const { mobileId } = useParams();
    const [mobile, setMobile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = mobileId;
                const response = await axios.get(`http://localhost:8080/product/${id}`);
                // Your original JSON string
                const jsonString = response.data.data.description
                // Remove the outer double quotes
                //const cleanedJsonString = jsonString.slice(1, -1);
                const cleanedJsonString = jsonString.replace(/\s+/g, ' ');
                // Parse the JSON object
                const jsonObject = JSON.parse(cleanedJsonString);

                console.log(jsonObject);

                setMobile({ ...response.data.data, description: jsonObject });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [mobileId]);

    // Check if mobile.description exists before accessing its properties
    if (!mobile.name) {
        { console.log(mobile) }
        return <h1>Loading</h1>;
    }

    return (
        <div className="row">
            {console.log(mobile)}
            <div className="col-4">
                <img src={`/image/mobile/${mobile.location}`} alt="Image" />
            </div>
            <div className="col-8">
                <h1>{mobile.name}</h1>
                <h3>{mobile.price} LKR</h3>
                <p>Display: {mobile.description.Display}</p>
            </div>
        </div>
    );
}

export default ViewProductPage;
