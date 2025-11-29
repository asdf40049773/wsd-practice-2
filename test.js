const express = require('express');
const app = express();

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString(); 
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); 
};

app.use(requestLogger);
app.use(express.json());

let posts = [];
let nextPostNumber = 1; 

app.post('/posts', (req, res) => {
    const { title, content } = req.body; 

    if (!title || !content) {
        
        return res.status(400).json({
            "status": "error"
        });
    }

    const newPost = {
        number: nextPostNumber++, 
        title: title,
        content: content
    };

    posts.push(newPost);

    res.status(201).json({
        "status": "success",
        "data": newPost
    });
});

let users = [
    {
        "id": 0,
        "username": "admin",
        "email": "admin@test.com",
        "password": "1111"
    }
];
let nextUserId = 1;

app.post('/users', (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({
            "status": "error"
        });
    }

    const newUser = {
        id: nextUserId++,
        username,
        email,
        password 
    };

    users.push(newUser);

    res.status(201).json({
        "status": "success",
        "data": {id: newUser.id, username: newUser.username, email: newUser.email} 
    });
});

app.get('/posts', (req, res) => {
    res.status(200).json({
        "status": "success",
        "data": posts 
    });
});

app.get('/users/:id', (req, res) => {  
    const userId = parseInt(req.params.id); 

    if (userId === 0) {
        return res.status(500).json({
            "status": "error"
        });
    }

    const user = users.find(p => p.id === userId);

    if (user) {
        res.status(200).json({
            "status": "success",
            "data": {id: user.id, username: user.username, email: user.email}
        });
    } 
    else {
        res.status(404).json({
            "status": "error"
        });
    }
});

app.put('/posts/:number', (req, res) => {
    const postNumber = parseInt(req.params.number);
    const { title, content } = req.body;
    
    const postIndex = posts.findIndex(p => p.number === postNumber);

    if (postIndex === -1) {
        return res.status(404).json({
            "status": "error"
        });
    }

    if (!title || !content) {
        return res.status(400).json({
            "status": "error"
        });
    }

    posts[postIndex].title = title;
    posts[postIndex].content = content;
    
    res.status(200).json({
        "status": "success",
        "data": posts[postIndex]
    });
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { new_email } = req.body; 

    if (userId === 0) {
        return res.status(500).json({
            "status": "error"
        });
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({
            "status": "error"
        });
    }

    if (!new_email) {
        return res.status(400).json({
            "status": "error"
        });
    }

    users[userIndex].email = new_email; 
    
    res.status(200).json({
        "status": "success",
        "data": { 
            id: users[userIndex].id, 
            username: users[userIndex].username,
            email: users[userIndex].email
        } 
    });
});

app.delete('/posts/:number', (req, res) => {
    const postNumber = parseInt(req.params.number);

    const initialLength = posts.length;
    
    posts = posts.filter(p => p.number !== postNumber);

    if (posts.length === initialLength) {
        return res.status(404).json({
            "status": "error"
        });
    }
    
    res.status(204).send(); 
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    if (userId === 0) {
        return res.status(500).json({
            "status": "error"
        });
    }
    
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== userId);

    if (users.length === initialLength) {
        return res.status(404).json({
            "status": "error"
        });
    }
    
    res.status(204).send(); 
});

const port = 3000;
app.listen(port, () => {
    console.log(`API server running at http://113.198.66.68:${port}/`);
});