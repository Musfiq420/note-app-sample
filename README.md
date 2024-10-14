# Note App Sample

A simple note-taking web application that allows users to create, edit, view, and delete notes. This project demonstrates fundamental **CRUD operations** (Create, Read, Update, Delete) using a full-stack approach with Node.js, Express.js, and MongoDB.

## Features
- **Add New Notes**: Create and save new notes quickly.
- **Edit Notes**: Update content of existing notes.
- **Delete Notes**: Remove unwanted notes.
- **View All Notes**: Display a list of saved notes.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: Tailwind css
- **Backend**: Node.js with Express.js  
- **Database**: MongoDB (for storing notes)  
- **Deployment**: Hosted on [Render](https://note-app-sample.onrender.com)  

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js**: [Download & Install](https://nodejs.org/)  
- **MongoDB**: [Setup MongoDB](https://www.mongodb.com/)  

### Installation
1. **Clone the repository**:  
   bash```
   git clone https://github.com/Musfiq420/note-app-sample.git
   cd note-app-sample
   ```

2. **Install dependencies**:  
   bash```
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in the root directory and add:
   bash```
   MONGODB_URI=<your-mongodb-connection-string>
   PORT=3000
   ```

4. **Run the application**:  
   bash```
   npm start
   ```

5. **Access the app**:  
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
The live version of this project is deployed on Render. You can access it here:  
[Note App Sample on Render](https://note-app-sample.onrender.com)

## Contributing
Contributions are welcome!  
1. Fork the repository.  
2. Create a new branch:  
   bash```
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:  
   bash```
   git commit -m 'Add some feature'
   ```
4. Push to the branch:  
   bash```
   git push origin feature/your-feature-name
   ```
5. Open a pull request.
