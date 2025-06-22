import axios from 'axios';
    export const fetchPosts = async(req, res) => {

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            res.json({success:true, data:response.data});
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
        }

    }

    export const fetchPostById = async(req, res)=> {
        try {
            const id = req.params;
            console.log(id);
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            res.json(response.data);
            res.status(200).json({success:true, data:response.data});
        } catch (error) {
            
        }
    }