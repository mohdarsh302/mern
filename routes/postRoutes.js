import express from 'express';
import axios from 'axios';
import { fetchPostById, fetchPosts } from '../services/BlogPost.js';

const router = express.Router();

router.get('/', fetchPosts);
router.get('/:id', fetchPostById);


export default router;