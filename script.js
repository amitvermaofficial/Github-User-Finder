let searchBtn = document.querySelector('.search');
let userInput = document.querySelector('.userinput');
let card = document.querySelector('.card');
let loader = document.querySelector('.loader');
let error = document.querySelector('.error');

function getUserData(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error('OPPs, Some Error Occured !!!');
        return raw.json();
    });
}

function decorateUserData(details) {    
    var data = `<div class="flex flex-col md:flex-row gap-8">
                <!-- Profile Image -->
                <div class="flex-shrink-0">
                    <img 
                        src="${details.avatar_url}" 
                        alt="Profile" 
                        class="w-48 h-48 rounded-full border-4 border-gray-100 shadow-md"
                    >
                </div>

                <!-- User Info -->
                <div class="flex-1">
                    <div class="flex items-center gap-4 mb-4">
                        <h2 class="text-2xl font-bold text-gray-800">${details.name==null ? "Github User" : details.name}</h2>
                        <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">@${details.login}</span>
                    </div>
                    
                    <p class="text-gray-600 mb-6">${details.bio ? details.bio : "Sorry there is no bio..."}</p>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-gray-800">${details.public_repos}</div>
                            <div class="text-sm text-gray-600">Repositories</div>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-gray-800">${details.followers}</div>
                            <div class="text-sm text-gray-600">Followers</div>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-gray-800">${details.following}</div>
                            <div class="text-sm text-gray-600">Following</div>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="text-2xl font-bold text-gray-800">${details.public_gists
}</div>
                            <div class="text-sm text-gray-600">Gists</div>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-4">
                        <a href="#" class="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${details.location==null?"🌍" : details.location}</span>
                        </a>
                        <a href="${details.blog}" target="_blank" class="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                            <i class="fas fa-link"></i>
                            <span>${details.blog ? "Visit website🚀" : "Website"}</span>
                        </a>
                        <a href="#" class="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                            <i class="fas fa-building"></i>
                            <span>${details.company ? details.company : 'N/A'}</span>
                        </a>
                    </div>
                </div>
            </div>`
    
    card.innerHTML = data;
}


function getUserRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
        if (!raw.ok) throw new Error('Failed to fetch Repositories ...');

        return raw.json();
    });
}

searchBtn.addEventListener('click', () => {
    let username = userInput.value.trim();
    if (username.length > 0) {
        card.classList.add('hidden');
        loader.classList.remove('hidden');
        error.classList.add('hidden')
        getUserData(username)
        .then((data) => {
            card.classList.remove('hidden');
            loader.classList.add('hidden');
            decorateUserData(data)
        })
        .catch((err) => {
            loader.classList.add('hidden')
            card.classList.add('hidden');
            error.classList.remove('hidden');
        })

    } else {
        alert('sahi username daal na chutiye');
    }
        
})


