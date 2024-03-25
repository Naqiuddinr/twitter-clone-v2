// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


// const BASE_URL = 'https://85e26881-9d33-47ea-98c8-e946f60ddfca-00-1ciplofky6m83.spock.replit.dev';

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        try {
            const postsRef = collection(db, `users/${userId}/posts`);

            const querySnapshot = await getDocs(postsRef);
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                content: doc.data().content,
                imageUrl: doc.data().imageUrl ? doc.data().imageUrl : ""
            }))
            return docs;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const savePost = createAsyncThunk(
    "posts/savePost",
    async ({ userId, postContent, file }) => {
        try {
            let imageUrl = "";
            console.log(file);

            if (file !== null) {
                const imageRef = ref(storage, `posts/${file.name}`);
                const response = await uploadBytes(imageRef, file);
                imageUrl = await getDownloadURL(response.ref)

            }

            const postsRef = collection(db, `users/${userId}/posts`);
            console.log(postsRef);

            const newPostRef = doc(postsRef);
            console.log(newPostRef);
            await setDoc(newPostRef, { content: postContent, likes: [], imageUrl });
            const newPost = await getDoc(newPostRef);

            console.log(newPost)

            const post = {
                id: newPost.id,
                ...newPost.data(),
            };
            return post;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const likePost = createAsyncThunk(
    "posts/likePost",
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`);

            const docSnap = await getDoc(postRef);

            if (docSnap.exists()) {
                const postData = docSnap.data();
                const likes = [...postData.likes, userId];

                await setDoc(postRef, { ...postData, likes });
            }

            return { userId, postId }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
);

export const removeLikeFromPost = createAsyncThunk(
    "posts/removeLikeFromPost",
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`);

            const docSnap = await getDoc(postRef);

            if (docSnap.exists()) {
                const postData = docSnap.data();
                const likes = postData.likes.filter((id) => id !== userId);

                await setDoc(postRef, { ...postData, likes });
            }

            return { userId, postId }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ userId, postId, newPostContent, newFile }) => {
        try {
            let newImageUrl;
            if (newFile) {
                const imageRef = ref(storage, `posts/${newFile.name}`);
                const response = await uploadBytes(imageRef, newFile);
                newImageUrl = await getDownloadURL(response.ref);
            }

            const postRef = doc(db, `users/${userId}/posts/${postId}`);

            const postSnap = await getDoc(postRef);
            console.log(postSnap)
            if (postSnap.exists()) {
                const postData = postSnap.data();

                const updatedData = {
                    ...postData,
                    content: newPostContent || postData.content,
                    imageUrl: newImageUrl || postData.imageUrl
                };

                await updateDoc(postRef, updatedData);

                const updatedPost = { id: postId, ...updatedData };
                return updatedPost
            } else {
                throw new Error("Post does not exist");
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ({ userId, postId }) => {
        try {
            const postRef = doc(db, `users/${userId}/posts/${postId}`);

            await deleteDoc(postRef);

            return postId;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        });
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [action.payload, ...state.posts];
        });
        builder.addCase(likePost.fulfilled, (state, action) => {
            const { userId, postId } = action.payload;

            const postIndex = state.posts.findIndex((post) => post.id === postId);

            if (postIndex !== -1) {
                state.posts[postIndex].likes.push(userId);
            }
        });
        builder.addCase(removeLikeFromPost.fulfilled, (state, action) => {
            const { userId, postId } = action.payload;

            const postIndex = state.posts.findIndex((post) => post.id === postId);

            if (postIndex !== -1) {
                state.posts[postIndex].likes = state.posts[postIndex].filter(
                    (id) => id !== userId
                )
            }
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const updatedPost = action.payload;
            const postIndex = state.posts.findIndex(
                (post) => post.id === updatedPost.id
            );
            if (postIndex !== -1) {
                state.posts[postIndex] = updatedPost
            }
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            const deletedPostId = action.payload;

            state.posts = state.posts.filter((post) => post.id !== deletedPostId);
        })
    }
});

export default postsSlice.reducer;
