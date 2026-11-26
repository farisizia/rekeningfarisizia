document.addEventListener("DOMContentLoaded", () => {
    const linksContainer = document.querySelector(".links-container");
    const toast = document.getElementById("toast");
    let toastTimeout;

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.remove("show");
        void toast.offsetWidth;
        toast.classList.add("show");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    function fallbackCopy(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, text.length);

        let copied = false;
        try {
            copied = document.execCommand("copy");
        } catch (err) {
            copied = false;
        }
        document.body.removeChild(textArea);

        if (copied) {
            showToast("Nomor rekening berhasil disalin!");
        } else {
            showToast("Gagal menyalin otomatis. Silakan salin manual.");
        }
    }

    function copyNumber(button) {
        const numberToCopy = button.dataset.num;
        if (!numberToCopy) return;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
                .writeText(numberToCopy)
                .then(() => {
                    showToast("Nomor rekening berhasil disalin!");
                })
                .catch(() => {
                    fallbackCopy(numberToCopy);
                });
        } else {
            fallbackCopy(numberToCopy);
        }
    }

    if (linksContainer) {
        linksContainer.addEventListener("click", (event) => {
            const button = event.target.closest(".link-button");
            if (button) {
                copyNumber(button);
            }
        });
    }
});
