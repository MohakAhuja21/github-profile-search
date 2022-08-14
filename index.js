console.log("started the project @night 9:50 13th august 2022.");

const url="https://api.github.com/users";

// calling elements from html file
const search=document.getElementById('searchInput');
const searchBtn=document.getElementById('search-btn');
const profileEl= document.getElementById('profileContainer');
const loadingEl= document.getElementById('loading');


const generateProfile =(profile)=>{
    return`
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avatar">
                    <img src="${profile.avatar_url}"> 
                    </div>
                    <div class="self">
                        <h2>${profile.name}</h2>  
                        <h3>${profile.login}</h3> 
                        <div class="btn-right">
                        <a href="${profile.html_url}" target="_blank">
                        <button class="secondary-btn">check profile</button>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="about">
                <h2>about</h2>
                <p>${profile.bio}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>following</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item status-highlight">
                    <h3>repositories <i class='bx bx-git-repo-forked'></i></h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>
    `
};

const fetchProfile= async()=>{

    const username= search.value;

    loadingEl.innerText="loading...";

    try {
        const res= await fetch(`${url}/${username}`)
        const data= await res.json();

        if (data.bio) {
            loadingEl.innerText="";
            profileEl.innerHTML=generateProfile(data)    
        }
        else{
            loadingEl.innerHTML=data.message;
            loadingEl.style.color="red";
        }   
} 
    catch (error) {
        console.log({error});  
        loadingEl.innerText="";
    }
}
searchBtn.addEventListener('click',fetchProfile);