document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const container = document.querySelector('.container') || document.getElementById('container');
    const backToTopBtn = document.getElementById('backToTop');
    const gallery = document.querySelector(".album-gallery");
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // 預設 active tab（profile）
    navItems.forEach(item => {
        if (item.dataset.page === 'profile') {
            item.classList.add('active');
        }
    });

    // 返回頂部按鈕顯示與點擊事件
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('show', window.scrollY > 300);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 相冊滑動功能（滑鼠+觸控裝置）
    if (gallery) {
        const stopDragging = () => {
            isDragging = false;
            gallery.style.cursor = "default";
        };

        const startDragging = (x) => {
            isDragging = true;
            startX = x - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
            gallery.style.cursor = "grabbing";
        };

        const moveDragging = (x) => {
            if (!isDragging) return;
            const currentX = x - gallery.offsetLeft;
            const walk = (currentX - startX) * 2; // 調整拖動速度
            gallery.scrollLeft = scrollLeft - walk;
        };

        // 滑鼠事件
        gallery.addEventListener("mousedown", e => startDragging(e.pageX));
        gallery.addEventListener("mouseup", stopDragging);
        gallery.addEventListener("mouseleave", stopDragging);
        gallery.addEventListener("mousemove", e => {
            if (isDragging) e.preventDefault();
            moveDragging(e.pageX);
        });

        // 觸控事件
        gallery.addEventListener("touchstart", e => {
            if (e.touches.length === 1) {
                startDragging(e.touches[0].pageX);
            }
        }, { passive: true });

        gallery.addEventListener("touchmove", e => {
            if (isDragging && e.touches.length === 1) {
                moveDragging(e.touches[0].pageX);
            }
        }, { passive: false });

        gallery.addEventListener("touchend", stopDragging);
        gallery.addEventListener("touchcancel", stopDragging);
    }
});
