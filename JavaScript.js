function abrirMenu(){

let menu = document.getElementById("menu-lateral")
let overlay = document.getElementById("overlay")
let botao = document.getElementById("botao-menu")

if(menu.style.transform === "translateX(0%)"){

menu.style.transform = "translateX(-100%)"
overlay.style.opacity = "0"
overlay.style.visibility = "hidden"
botao.innerHTML = "☰"

}else{

menu.style.transform = "translateX(0%)"
overlay.style.opacity = "1"
overlay.style.visibility = "visible"

}

}


        async function updateTwitchButton() {
            const clientId = 'aywaeyd31mbjijkzhdi9itch9mjhwh';
            const clientSecret = 'pvm99rjmvdvwk4i34bhrxp0hv96pnh';
            const username = 'peachylovebunny';
            const twitchUrl = 'https://www.twitch.tv/' + username;

            const svgIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 24 24" fill="currentColor" style="width: 1em; height: 1em; margin-left: 0.5em; vertical-align: middle; display: inline-block;">
                    <path d="m11.481 6.259v6.259h-2.091v-6.259zm5.74 0v6.259h-2.091v-6.259zm0 10.962 3.649-3.663v-11.467h-17.221v15.13h4.702v3.13l3.13-3.13zm5.74-17.221v14.61l-6.259 6.259h-4.702l-3.13 3.13h-3.13v-3.129h-5.74v-16.702l1.572-4.168z"></path>
                </svg>
            `;

            try {
                const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
                    method: 'POST'
                });

                const tokenData = await tokenResponse.json();
                const accessToken = tokenData.access_token;

                const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
                    headers: {
                        'Client-ID': clientId,
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                const streamData = await streamResponse.json();
                const isLive = streamData.data && streamData.data.length > 0;

                const desktopButton = document.querySelector('.header-button-inner-wrap a');
                const mobileButton = document.querySelector('.mobile-header-button-inner-wrap a');
                const htmlBlock = document.querySelector('.header-html-inner p span');

                if (isLive) {
                    if (desktopButton) {
                        desktopButton.innerHTML = '✨&nbsp;&nbsp;I’m live on Twitch' + svgIcon;
                        desktopButton.href = twitchUrl;
                        desktopButton.classList.add('twitch-live-button');
                    }

                    if (mobileButton) {
                        mobileButton.innerHTML = '✨&nbsp;&nbsp;I’m live!' + svgIcon;
                        mobileButton.href = twitchUrl;
                        mobileButton.classList.add('twitch-live-button');
                        mobileButton.style.display = 'inline-flex';
                    }

                    if (htmlBlock) {
                        htmlBlock.innerText = 'come say hi...';
                    }
                } else {
                    if (mobileButton) {
                        mobileButton.style.display = 'none';
                    }
                }
            } catch (error) {
                console.error('Twitch status check failed:', error);
            }
        }

        document.addEventListener('DOMContentLoaded', updateTwitchButton);
    

// Sparkle Effect Script

        const isDesktop = window.innerWidth >= 1024;
        let sparklesEnabled = localStorage.getItem('sparkles') !== 'off';
        let lastSparkleTime = 0;
        const sparkleCooldown = 25;
        let sparkleWrapper;

        function createSparkle(e) {
            if (!sparklesEnabled || !isDesktop || !sparkleWrapper) return;

            const now = Date.now();
            if (now - lastSparkleTime < sparkleCooldown) return;
            lastSparkleTime = now;

            const symbols = ['⋆', '˚｡', '✧', '˖.', '⊹', '⟡', '♡'];
            const sparkle = document.createElement("div");
            sparkle.classList.add("glyph-sparkle");
            sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

            const offsetX = (Math.random() - 0.5) * 16;
            const offsetY = (Math.random() - 0.5) * 16;
            sparkle.style.left = `${e.clientX + offsetX}px`;
            sparkle.style.top = `${e.clientY + offsetY}px`;

            const driftX = (Math.random() - 0.5) * 30;
            const rotate = (Math.random() * 16 - 8);
            sparkle.style.setProperty('--drift-x', `${driftX}px`);
            sparkle.style.setProperty('--rotate', `${rotate}deg`);

            sparkleWrapper.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }

        function triggerFizzEffect(button) {
            const fizz = document.createElement("div");
            fizz.className = "fizz-effect";
            fizz.innerText = "✨";
            const rect = button.getBoundingClientRect();
            fizz.style.left = `${rect.left + rect.width / 2}px`;
            fizz.style.top = `${rect.top + rect.height / 2}px`;
            document.body.appendChild(fizz);
            setTimeout(() => fizz.remove(), 330);
        }

        document.addEventListener("DOMContentLoaded", function () {
            if (isDesktop) {
                sparkleWrapper = document.createElement('div');
                sparkleWrapper.id = 'sparkle-wrapper';
                sparkleWrapper.style.cssText = `
                    position: fixed;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 9998;
                `;
                document.body.appendChild(sparkleWrapper);

                if (sparklesEnabled) {
                    document.addEventListener("mousemove", createSparkle);
                }

                const toggle = document.createElement("button");
                toggle.innerText = "✨";
                toggle.className = "sparkle-toggle " + (sparklesEnabled ? "sparkles-on" : "sparkles-off");
                toggle.title = sparklesEnabled
                    ? "click to dispel the charm"
                    : "click to conjure sparkles";

                const cursorFix = document.createElement("span");
                cursorFix.className = "sparkle-cursor-fix";
                toggle.appendChild(cursorFix);

                toggle.addEventListener("click", function () {
                    sparklesEnabled = !sparklesEnabled;
                    localStorage.setItem('sparkles', sparklesEnabled ? 'on' : 'off');
                    toggle.classList.toggle('sparkles-on', sparklesEnabled);
                    toggle.classList.toggle('sparkles-off', !sparklesEnabled);
                    toggle.title = sparklesEnabled
                        ? "click to dispel the charm"
                        : "click to conjure sparkles";

                    if (sparklesEnabled) {
                        document.addEventListener("mousemove", createSparkle);
                    } else {
                        document.removeEventListener("mousemove", createSparkle);
                    }

                    triggerFizzEffect(toggle);
                });

                document.body.appendChild(toggle);
            }
        });
