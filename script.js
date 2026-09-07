const insVideo = document.querySelector('.ins_flex');

if (insVideo) {
    const items = Array.from(insVideo.children);

    items.forEach(item => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute("aria-hidden", "true");
        insVideo.appendChild(duplicateNode);
    });
}

$(document).ready(function () {

    $(window).on("scroll load", function () {

        $('#menu').removeClass("fa-times");
        $('.navbar').removeClass("active");

        if ($(window).scrollTop() > 60) {
            $('.header').addClass("active");
        } else {
            $('.header').removeClass("active");
        }

        $('section').each(function () {

            let top = $(window).scrollTop();
            let height = $(this).outerHeight();
            let offset = $(this).offset().top;
            let id = $(this).attr('id');

            if (
                id &&
                top >= offset - 100 &&
                top < offset + height
            ) {
                $('.navbar a').removeClass('active');
                $('.navbar a[href="#' + id + '"]').addClass('active');
            }

        });

    });

});

const countdownDate = new Date("October 20, 2026 00:00:00").getTime();

const countdown = setInterval(function () {

    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const fields = document.querySelectorAll(".infield input");

    if (fields.length === 4) {
        fields[0].value = days;
        fields[1].value = hours;
        fields[2].value = minutes;
        fields[3].value = seconds;
    }

    if (distance < 0) {

        clearInterval(countdown);

        if (fields.length === 4) {
            fields[0].value = 0;
            fields[1].value = 0;
            fields[2].value = 0;
            fields[3].value = 0;
        }

        const head = document.querySelector("#head");

        if (head) {
            head.textContent = "Offer Expired";
        }
    }

}, 1000);

const container = document.getElementById("cardContainer");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");
const status = document.getElementById("sorterStatus");

const products = {

    shirts: [
        { image: "shirts/shir1.jpg" },
        { image: "shirts/shirt.jpg" },
        { image: "shirts/shirt2.jpg" },
        { image: "shirts/shirt4.jpg" },
        { image: "shirts/shirt5.jpg" },
        { image: "shirts/shirt6.jpg" },
        { image: "shirts/shirt7.jpg" },
        { image: "shirts/shirt8.jpg" },
        { image: "shirts/shirt9.jpg" },
        { image: "shirts/shirt10.jpg" },
    ],

    pants: [
        { image: "pants/pants1.jpg" },
        { image: "pants/pants.jpg" },
        { image: "pants/pants2.png" },
        { image: "pants/pants3.jpg" },
        { image: "pants/pants4.jpg" },
        { image: "pants/pants5.jpg" },
        { image: "pants/pants8.jpg" },
        { image: "pants/pants9.jpg" },
        { image: "pants/skirt.jpg" },
        { image: "pants/skirts.jpg" },
        { image: "it/it10.jpg" },
    ],

    jackets: [
        { image: "jackets/jacket.jpg" },
        { image: "jackets/jacket1.jpg" },
        { image: "jackets/jacket2.jpg" },
        { image: "jackets/jacket3.jpg" },
        { image: "jackets/jacket4.jpg" },
        { image: "jackets/jacket5.jpg" },
        { image: "jackets/jacket7.jpg" },
        { image: "jackets/jkt.jpg" },
        { image: "jackets/shirt1.jpg" },
        { image: "it/it3.jpg" },
        { image: "it/it4.jpg" },
    ],

    shoes: [
        { image: "shoes/shes3.jpg" },
        { image: "shoes/shoes.png" },
        { image: "shoes/shoes1.jpg" },
        { image: "shoes/shoes2.jpg" },
        { image: "shoes/shoes4.jpg" },
        { image: "shoes/shoes5.jpg" },
        { image: "shoes/shoes6.jpg" },
        { image: "shoes/shoes7.jpg" },
        { image: "shoes/shoes8.jpg" },
        { image: "shoes/shoes9.jpg" },
        { image: "shoes/shoes10.jpg" },
    ],

    accessories: [
        { image: "acc/acc.jpg" },
        { image: "acc/acc1.jpg" },
        { image: "acc/acc2.jpg" },
        { image: "acc/acc3.jpg" },
        { image: "acc/acc4.jpg" },
        { image: "acc/acc5.jpg" },
        { image: "acc/acc6.jpg" },
        { image: "acc/acc7.jpg" },
        { image: "acc/acc8.jpg" },
        { image: "acc/acc9.jpg" },
        { image: "acc/acc10.jpg" },
        { image: "acc/acc11.jpg" },
    ]

};

const categories = [
    "shirts",
    "pants",
    "shoes",
    "accessories",
    "jackets"
];

let randomizedCategories = [];
let currentCategoryIndex = 0;
let currentCategory = "";

let shuffledProducts = [];
let currentIndex = 0;

let currentCard = null;

let isDragging = false;
let startX = 0;
let currentX = 0;

let selectedItems = {
    shirts: [],
    pants: [],
    shoes: [],
    accessories: [],
    jackets: []
};

function shuffleCategories() {

    randomizedCategories = [...categories];

    for (let i = randomizedCategories.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            randomizedCategories[i],
            randomizedCategories[randomIndex]
        ] = [
            randomizedCategories[randomIndex],
            randomizedCategories[i]
        ];
    }

    currentCategoryIndex = 0;
    currentCategory = randomizedCategories[0];
}

function shuffleProducts() {

    shuffledProducts = [
        ...products[currentCategory]
    ];

    for (let i = shuffledProducts.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [
            shuffledProducts[i],
            shuffledProducts[randomIndex]
        ] = [
            shuffledProducts[randomIndex],
            shuffledProducts[i]
        ];
    }
}

function createCards() {

    container.innerHTML = "";

    shuffledProducts.forEach((product, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.style.backgroundImage =
            `url("${product.image}")`;

        card.style.zIndex = index;

        const yesIndicator =
            document.createElement("div");

        yesIndicator.className =
            "swipe-indicator swipe-yes";

        yesIndicator.textContent =
            "KEEP";

        const noIndicator =
            document.createElement("div");

        noIndicator.className =
            "swipe-indicator swipe-no";

        noIndicator.textContent =
            "DROP";

        card.appendChild(yesIndicator);
        card.appendChild(noIndicator);

        container.appendChild(card);

    });

    currentIndex = 0;

    updateCategoryText();
    updateStatus();
    setTopCard();
}

function setTopCard() {

    const cards =
        container.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.zIndex = index;
    });

    currentCard =
        container.querySelector(".card:last-child");
}

function updateCategoryText() {

    const title =
        document.getElementById("sorterTitle");

    const description =
        document.getElementById("sorterDescription");

    if (!title) {
        return;
    }

    const names = {

        shirts: "Choose Your Tops",

        pants: "Choose Your Pants",

        shoes: "Choose Your Shoes",

        accessories: "Choose Your Accessories",

        jackets: "Choose Your Jackets"

    };

    title.textContent =
        names[currentCategory];

    if (description) {
        description.textContent =
            "Keep what you would wear.";
    }
}

function updateStatus() {

    const total =
        shuffledProducts.length;

    const remaining =
        container.querySelectorAll(".card").length;

    const completed =
        total - remaining;

    status.textContent =
        `${completed} / ${total}`;
}

function choose(direction) {

    currentCard =
        container.querySelector(".card:last-child");

    if (!currentCard) {
        finishCategory();
        return;
    }

    const product =
        shuffledProducts[currentIndex];

    const yesIndicator =
        currentCard.querySelector(".swipe-yes");

    const noIndicator =
        currentCard.querySelector(".swipe-no");

    currentCard.style.transition =
        "transform .4s ease, opacity .4s ease";

    if (direction === "yes") {

        selectedItems[currentCategory].push(product);

        yesIndicator.style.opacity = "1";

        currentCard.style.transform =
            "translateX(1000px) rotate(45deg)";

    } else {

        noIndicator.style.opacity = "1";

        currentCard.style.transform =
            "translateX(-1000px) rotate(-45deg)";
    }

    currentCard.style.opacity = "0";

    setTimeout(() => {

        currentCard.remove();

        currentIndex++;

        updateStatus();

        setTopCard();

        const remainingCards =
            container.querySelectorAll(".card").length;

        if (remainingCards === 0) {
            finishCategory();
        }

    }, 400);
}

function finishCategory() {

    if (
        selectedItems[currentCategory].length === 0
    ) {

        alert(
            `You need to keep at least one ${currentCategory}.`
        );

        currentIndex = 0;

        shuffleProducts();
        createCards();

        return;
    }

    currentCategoryIndex++;

    if (
        currentCategoryIndex >=
        randomizedCategories.length
    ) {

        finishSorter();

        return;
    }

    currentCategory =
        randomizedCategories[currentCategoryIndex];

    currentIndex = 0;

    shuffleProducts();
    createCards();
}

function getRandomItem(category) {

    const items =
        selectedItems[category];

    if (!items || items.length === 0) {
        return null;
    }

    return items[
        Math.floor(
            Math.random() * items.length
        )
    ];
}

function finishSorter() {

    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    restartBtn.style.display = "block";

    status.textContent =
        "Outfit ready!";

    showOutfit();
}

function showOutfit() {

    const top =
        getRandomItem("shirts");

    const pants =
        getRandomItem("pants");

    const shoes =
        getRandomItem("shoes");

    const accessory =
        getRandomItem("accessories");

    const jacket =
        getRandomItem("jackets");

    container.innerHTML = "";

    container.classList.remove("outfit-pop");

    const outfit =
        document.createElement("div");

    outfit.className =
        "final-outfit";

    const title =
        document.createElement("h2");

    title.textContent =
        "YOUR FIT";

    title.className =
        "outfit-title";

    const outfitImages =
        document.createElement("div");

    outfitImages.className =
        "outfit-images";

    const items = [];

    if (top) {
        items.push(top);
    }

    if (pants) {
        items.push(pants);
    }

    if (shoes) {
        items.push(shoes);
    }

    if (accessory) {
        items.push(accessory);
    }

    if (jacket) {
        items.push(jacket);
    }

  
    items.forEach((item, index) => {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "outfit-item";

    const img =
        document.createElement("img");

    img.src =
        item.image;

    img.alt =
        "Selected outfit item";

    const addCartBtn =
        document.createElement("button");

    addCartBtn.className =
        "add-cart-btn";

    addCartBtn.textContent =
        "ADD TO CART";

    addCartBtn.addEventListener("click", () => {

        addToCart(item);

    });

    wrapper.appendChild(img);
    wrapper.appendChild(addCartBtn);

    outfitImages.appendChild(wrapper);

    setTimeout(() => {

        wrapper.classList.add("show");

    }, index * 150);

});
    outfit.appendChild(title);
    outfit.appendChild(outfitImages);

    container.appendChild(outfit);

    setTimeout(() => {
        container.classList.add("outfit-pop");
    }, 50);
}

function handleSwipe(deltaX) {

    const sensitivity = 80;

    if (!currentCard) {
        return;
    }

    if (
        Math.abs(deltaX) >
        sensitivity
    ) {

        choose(
            deltaX > 0
                ? "yes"
                : "no"
        );

    } else {

        currentCard.style.transition =
            "transform .25s ease";

        currentCard.style.transform =
            "translateX(0) rotate(0)";

        currentCard
            .querySelector(".swipe-yes")
            .style.opacity = "0";

        currentCard
            .querySelector(".swipe-no")
            .style.opacity = "0";
    }

    isDragging = false;
    currentX = 0;
}

container.addEventListener(
    "mousedown",
    e => {

        currentCard =
            container.querySelector(
                ".card:last-child"
            );

        if (!currentCard) {
            return;
        }

        isDragging = true;
        startX = e.clientX;

        currentCard.style.transition =
            "none";
    }
);

container.addEventListener(
    "mousemove",
    e => {

        if (
            !isDragging ||
            !currentCard
        ) {
            return;
        }

        currentX =
            e.clientX - startX;

        const rotation =
            currentX / 10;

        currentCard.style.transform =
            `translateX(${currentX}px) rotate(${rotation}deg)`;

        const opacity =
            Math.min(
                Math.abs(currentX) / 100,
                1
            );

        const yesIndicator =
            currentCard.querySelector(
                ".swipe-yes"
            );

        const noIndicator =
            currentCard.querySelector(
                ".swipe-no"
            );

        if (currentX > 0) {

            yesIndicator.style.opacity =
                opacity;

            noIndicator.style.opacity =
                "0";

        } else {

            noIndicator.style.opacity =
                opacity;

            yesIndicator.style.opacity =
                "0";
        }
    }
);

container.addEventListener(
    "mouseup",
    e => {

        if (
            !isDragging ||
            !currentCard
        ) {
            return;
        }

        currentX =
            e.clientX - startX;

        handleSwipe(currentX);
    }
);

container.addEventListener(
    "mouseleave",
    e => {

        if (
            !isDragging ||
            !currentCard
        ) {
            return;
        }

        currentX =
            e.clientX - startX;

        handleSwipe(currentX);
    }
);

container.addEventListener(
    "touchstart",
    e => {

        currentCard =
            container.querySelector(
                ".card:last-child"
            );

        if (!currentCard) {
            return;
        }

        isDragging = true;

        startX =
            e.touches[0].clientX;

        currentCard.style.transition =
            "none";
    }
);

container.addEventListener(
    "touchmove",
    e => {

        if (
            !isDragging ||
            !currentCard
        ) {
            return;
        }

        currentX =
            e.touches[0].clientX -
            startX;

        const rotation =
            currentX / 10;

        currentCard.style.transform =
            `translateX(${currentX}px) rotate(${rotation}deg)`;

        const opacity =
            Math.min(
                Math.abs(currentX) / 100,
                1
            );

        const yesIndicator =
            currentCard.querySelector(
                ".swipe-yes"
            );

        const noIndicator =
            currentCard.querySelector(
                ".swipe-no"
            );

        if (currentX > 0) {

            yesIndicator.style.opacity =
                opacity;

            noIndicator.style.opacity =
                "0";

        } else {

            noIndicator.style.opacity =
                opacity;

            yesIndicator.style.opacity =
                "0";
        }
    }
);

container.addEventListener(
    "touchend",
    e => {

        if (
            !isDragging ||
            !currentCard
        ) {
            return;
        }

        currentX =
            e.changedTouches[0].clientX -
            startX;

        handleSwipe(currentX);
    }
);

yesBtn.addEventListener(
    "click",
    () => {
        choose("yes");
    }
);

noBtn.addEventListener(
    "click",
    () => {
        choose("no");
    }
);

restartBtn.addEventListener(
    "click",
    () => {

        shuffleCategories();

        currentIndex = 0;

        selectedItems = {
            shirts: [],
            pants: [],
            shoes: [],
            accessories: [],
            jackets: []
        };

        yesBtn.style.display =
            "block";

        noBtn.style.display =
            "block";

        restartBtn.style.display =
            "none";

        container.classList.remove(
            "outfit-pop"
        );

        shuffleProducts();
        createCards();
    }
);

shuffleCategories();
shuffleProducts();
createCards();