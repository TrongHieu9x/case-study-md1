    // => viết hàm ngắn hơn và có thể loại bỏ từ khóa return
        window.onload = () => {
        let nhac = document.getElementById("a");
        function song() {
            nhac.play();
        }

        function endSong() {
            nhac.pause();
        }
        //trả về các phần tử khớp với bộ CSS chỉ định
        const score = document.querySelector(".score");
        const startScreen = document.querySelector(".startScreen");
        const gameArea = document.querySelector(".gameArea");

        let btn_a = document.querySelector('.buttonArea');

        let li = document.querySelectorAll('.buttonArea .ul li');
        //All : tất cả

        console.log(gameArea);
        // xử lí = click
        startScreen.addEventListener("click", start);
        startScreen.addEventListener("click", song);

        let player = {speed: 6, score : 0};
        let keys = {ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};
        // va cham
        function isCollide(a,b){
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();

            return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
        }


    //tạo đường kẻ phân làn
        function moveLines() {
            let lines = document.querySelectorAll(".lines");
            lines.forEach(function (item) {
            if (item.y >= 1100) {
                item.y = -50;
            }
                item.y += player.speed;
                item.style.top = item.y + "px";
            })
        }

        function endGame(){
            player.start=false;
            startScreen.classList.remove("hide");

        }

        // tạo chướng ngại vật
        function moveEnemy(car) {
        let enemy = document.querySelectorAll(".enemy");
            enemy.forEach(function (item) {

                if (isCollide(car, item)) {

                    endGame();
                    endSong();
                    startScreen.innerHTML = "Bạn die, điểm is:  " + player.score + "<br>" + "Click vào đây để đua lại";
                }

                if (item.y >= 1100) {
                    item.y = -300;
                    item.style.left = Math.floor(Math.random() * 550) + "px";
                }
                item.y += player.speed;
                item.style.top = item.y + "px";
            })
        }
    // thêm trình sử lí sự kiện vào phần tử được chỉ định
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);

        function keyDown(e) {
            e.preventDefault();
            keys[e.key] = true;
        }

        function keyUp(e) {
            e.preventDefault();
            keys[e.key] = false;
        }




        function gamePlay() {
     // trả về phần tử bộ css chỉ định
            let car = document.querySelector(".car");
            let road = gameArea.getBoundingClientRect();
            console.log(road);

            if (player.start) {
            moveLines();
            moveEnemy(car);

                if (keys.ArrowUp && player.y > road.top + 70) {
                    player.y -= player.speed
                }
                if (keys.ArrowDown && player.y < (road.bottom - 280)) {
                    player.y += player.speed
                }
                if (keys.ArrowLeft && player.x > 0) {
                    player.x -= player.speed
                }
                if (keys.ArrowRight && player.x < (road.width - 70)) {
                    player.x += player.speed
                }


                car.style.top = player.y + "px";
                car.style.left = player.x + "px";
                window.requestAnimationFrame(gamePlay);
                console.log(player.score++);
                score.innerText=" score:  " + player.score;
                player.score++;

            }

        }


    function start() {

        gameArea.classList.remove('hide');
        startScreen.classList.add("hide");

        gameArea.innerHTML = "";

        player.start = true;
        player.score = 0;

        window.requestAnimationFrame(gamePlay);

        //khoảng cách vạch đường phân làn
        for (let x = 0; x < 25; x++) {
            let roadLine = document.createElement("div");
            roadLine.setAttribute("class", "lines");
            roadLine.y = (x * 150);
            roadLine.style.top = roadLine.y + "px";
            gameArea.appendChild(roadLine);
        }

        let car = document.createElement("div");
        car.setAttribute("class", "car");

        gameArea.appendChild(car);

        player.x = car.offsetLeft;
        player.y = car.offsetTop;

        console.log("top position" + car.offsetTop);
        console.log("left position" + car.offsetLeft);

        // Tạo thêm các chướng ngại vật
        for (let x = 0; x < 6; x++) {

            let enemyCar = document.createElement("div");
            enemyCar.setAttribute("class", "enemy");
            enemyCar.y = ((x + 1) * 200);
            enemyCar.style.top = enemyCar.y + "px";
            enemyCar.style.backgroundColor = randomColor();

            function randomColor() {
                function c() {
                    let hex = Math.floor(Math.random() * 550).toString(16);
                    return ("0" + String(hex)).substr(-1);
                }

                return "#" + c() + c() + c();
            }

            enemyCar.style.left = Math.floor(Math.random() * 550) + "px";
            gameArea.appendChild(enemyCar);

        }

    }
}
