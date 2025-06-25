<template>
  <div class="header__wrapper">
    <header></header>
    <div class="cols__container">
      <div class="left__col">
        <div class="img__container">
          <img src="../img/user.jpg" alt="Anna Smith" />
          <span></span>
        </div>
        <h2>Anna Smith</h2>
        <p>She/Her</p>
        <p>anna@example.com</p>

        <ul class="about">
          <li><span>4,073</span>Followers</li>
          <li><span>322</span>Following</li>
          <li><span>200,543</span>Attraction</li>
        </ul>

        <div class="content">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam
            erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl
            ligula egestas nulla.
          </p>

          <ul>
            <li><i class="fab fa-twitter"></i></li>
            <li><i class="fab fa-pinterest"></i></li>
            <li><i class="fab fa-facebook"></i></li>
            <li><i class="fab fa-dribbble"></i></li>
          </ul>
        </div>
      </div>
      <div class="right__col">
        <nav>
          <ul>
            <li><a href="">photos</a></li>
            <li><a href="">galleries</a></li>
            <li><a href="">groups</a></li>
            <li><a href="">about</a></li>
          </ul>
          <button>Follow</button>
        </nav>

        <!-- File input button added here -->
        <input type = "file" @change="handleFileUpload" accept="image/*" />
        <img v-if="profilePicture" :src="profilePicture" alt="Profile Picture" /> <!-- Display the selected image here -->
        <input type="submit" value="Submit" />

        <div class="photos">
          <img src="../img/img_1.webp" alt="Photo" />
          <img src="../img/img_2.avif" alt="Photo" />
          <img src="../img/img_3.avif" alt="Photo" />
          <img src="../img/img_4.avif" alt="Photo" />
          <img src="../img/img_5.avif" alt="Photo" />
          <img src="../img/img_6.avif" alt="Photo" />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      profilePicture: null
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        // Generate a temporary URL for the selected image
        this.profilePicture = URL.createObjectURL(file);
        
        // Send the data to the server
        // Replace the URL with your actual server endpoint for storing profile pictures
        fetch('http://your-server-endpoint.com/upload-profile-picture', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to upload profile picture');
          }
          return response.json(); // Assuming server responds with JSON data
        })
        .then(data => {
          // Assuming the server responds with the path to the uploaded profile picture
          console.log('Profile picture uploaded:', data.path);
          // Update database with the path to the uploaded profile picture
          // Replace 'updateProfilePicture' with your actual database update method
          this.updateProfilePicture(data.path);
        })
        .catch(error => {
          console.error('Error uploading profile picture:', error);
        });
      } else {
        // Handle case where no file is selected
        this.profilePicture = null;
      }
    },
    updateProfilePicture(path) {
      // Send an AJAX request to update the database with the path to the profile picture
      // You need to implement this method based on your backend/database setup
      console.log('Updating database with profile picture:', path);
    }
  }
}
</script>


<style scoped>
/* CSS content from styles.css */



@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

body {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
}

.header__wrapper header {
  width: 100%;
  background: url("../img/bg.jpg") no-repeat 50% 100% / cover;
  min-height: calc(100px + 15vw);
}

.header__wrapper .cols__container .left__col {
  padding: 25px 20px;
  text-align: center;
  max-width: 350px;
  position: relative;
  margin: 0 auto;
}

.header__wrapper .cols__container .left__col .img__container {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translatex(-50%);
}
.header__wrapper .cols__container .left__col .img__container img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.18);
}
.header__wrapper .cols__container .left__col .img__container span {
  position: absolute;
  background: #2afa6a;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  bottom: 3px;
  right: 11px;
  border: 2px solid #fff;
}
.header__wrapper .cols__container .left__col h2 {
  margin-top: 60px;
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 5px;
}
.header__wrapper .cols__container .left__col p {
  font-size: 0.9rem;
  color: #818181;
  margin: 0;
}
.header__wrapper .cols__container .left__col .about {
  justify-content: space-between;
  position: relative;
  margin: 35px 0;
}
.header__wrapper .cols__container .left__col .about li {
  display: flex;
  flex-direction: column;
  color: #818181;
  font-size: 0.9rem;
}
.header__wrapper .cols__container .left__col .about li span {
  color: #1d1d1d;
  font-weight: 600;
}
.header__wrapper .cols__container .left__col .about:after {
  position: absolute;
  content: "";
  bottom: -16px;
  display: block;
  background: #cccccc;
  height: 1px;
  width: 100%;
}
.header__wrapper .cols__container .content p {
  font-size: 1rem;
  color: #1d1d1d;
  line-height: 1.8em;
}
.header__wrapper .cols__container .content ul {
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}
.header__wrapper .cols__container .content ul li {
  display: flex;
}
.header__wrapper .cols__container .content ul i {
  font-size: 1.3rem;
}
.header__wrapper .cols__container .right__col nav {
  display: flex;
  align-items: center;
  padding: 30px 0;
  justify-content: space-between;
  flex-direction: column;
}
.header__wrapper .cols__container .right__col nav ul {
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.header__wrapper .cols__container .right__col nav ul li a {
  text-transform: uppercase;
  color: #818181;
}
.header__wrapper .cols__container .right__col nav ul li:nth-child(1) a {
  color: #1d1d1d;
  font-weight: 600;
}
.header__wrapper .cols__container .right__col nav button {
  background: #0091ff;
  color:
  #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

</style>
