import React, { useState, useEffect } from 'react';

const App = () => {
    const [apiData, setApiData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const answer = await fetch(`https://api.kanye.rest/?page=${currentPage}`);
                const data = await answer.json();
                setApiData((prevData) => [...prevData, data]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage]);

    const loadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <h1>Here is the data from an API of Kanye West's quotes in React</h1>
            <h2>(Yes I am aware of the things hes said and I do not agree with them)</h2>
            {apiData.map((item, index) => (
                <div key={index}>
                    <p>Quote:</p>
                    <p>{item.quote}</p>
                </div>
            ))}
            {loading && <p>Loading Kanye West quotes...</p>}
            {!loading && (
                <button onClick={loadMore} disabled={loading}>
                    Load More
                </button>
            )}
        </div>
    );
};

export default App;
