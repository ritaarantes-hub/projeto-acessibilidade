/* =====================================================
   INCLUIWEB
   JAVASCRIPT
   ===================================================== */


/* -----------------------------
   ELEMENTOS
------------------------------ */

const body = document.body;

const menuButton =
    document.getElementById("menuButton");

const mainMenu =
    document.getElementById("mainMenu");

const increaseFont =
    document.getElementById("increaseFont");

const decreaseFont =
    document.getElementById("decreaseFont");

const contrastButton =
    document.getElementById("contrastButton");

const taskList =
    document.getElementById("taskList");

const addTaskButton =
    document.getElementById("addTaskButton");

const taskModal =
    document.getElementById("taskModal");

const closeModal =
    document.getElementById("closeModal");

const taskForm =
    document.getElementById("taskForm");

const taskName =
    document.getElementById("taskName");

const notification =
    document.getElementById("notification");

const completedCount =
    document.getElementById("completedCount");

const pendingCount =
    document.getElementById("pendingCount");

const progressCount =
    document.getElementById("progressCount");


/* -----------------------------
   MENU MOBILE
------------------------------ */

menuButton.addEventListener(
    "click",
    () => {

        const isOpen =
            menuButton.getAttribute(
                "aria-expanded"
            ) === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        mainMenu.classList.toggle(
            "open"
        );
    }
);


/* Fecha menu depois de clicar */

mainMenu.querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mainMenu.classList.remove(
                    "open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        );

    });


/* -----------------------------
   TAMANHO DO TEXTO
------------------------------ */

let currentFontSize = 16;

increaseFont.addEventListener(
    "click",
    () => {

        if (currentFontSize < 22) {

            currentFontSize += 1;

            document.documentElement.style
                .setProperty(
                    "--font-size",
                    `${currentFontSize}px`
                );

            showNotification(
                "Tamanho do texto aumentado."
            );
        }
    }
);


decreaseFont.addEventListener(
    "click",
    () => {

        if (currentFontSize > 14) {

            currentFontSize -= 1;

            document.documentElement.style
                .setProperty(
                    "--font-size",
                    `${currentFontSize}px`
                );

            showNotification(
                "Tamanho do texto diminuído."
            );
        }
    }
);


/* -----------------------------
   ALTO CONTRASTE
------------------------------ */

contrastButton.addEventListener(
    "click",
    () => {

        const enabled =
            body.classList.toggle(
                "high-contrast"
            );

        contrastButton.setAttribute(
            "aria-pressed",
            String(enabled)
        );

        if (enabled) {

            showNotification(
                "Alto contraste ativado."
            );

        } else {

            showNotification(
                "Alto contraste desativado."
            );
        }
    }
);


/* -----------------------------
   FILTROS
------------------------------ */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );
                    }
                );

                button.classList.add(
                    "active"
                );

                const filter =
                    button.dataset.filter;

                const tasks =
                    document.querySelectorAll(
                        ".task-card"
                    );

                tasks.forEach(
                    task => {

                        if (
                            filter === "all"
                        ) {

                            task.style.display =
                                "grid";

                        } else if (
                            task.dataset.status ===
                            filter
                        ) {

                            task.style.display =
                                "grid";

                        } else {

                            task.style.display =
                                "none";
                        }
                    }
                );
            }
        );
    }
);


/* -----------------------------
   CONCLUIR TAREFAS
------------------------------ */

function updateTaskStatus(task) {

    const check =
        task.querySelector(
            ".check-button"
        );

    const isCompleted =
        task.classList.toggle(
            "completed"
        );


    if (isCompleted) {

        task.dataset.status =
            "completed";

        check.textContent = "✓";

        check.setAttribute(
            "aria-pressed",
            "true"
        );

        check.setAttribute(
            "aria-label",
            "Marcar tarefa como pendente"
        );

    } else {

        task.dataset.status =
            "pending";

        check.textContent = "○";

        check.setAttribute(
            "aria-pressed",
            "false"
        );

        check.setAttribute(
            "aria-label",
            "Marcar tarefa como concluída"
        );
    }

    updateCounters();
}


/* -----------------------------
   BOTÕES DE CHECK
------------------------------ */

function activateTaskButtons() {

    document
        .querySelectorAll(".check-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const task =
                        button.closest(
                            ".task-card"
                        );

                    updateTaskStatus(task);

                    const title =
                        task.querySelector(
                            "h3"
                        ).textContent;

                    const completed =
                        task.classList.contains(
                            "completed"
                        );

                    showNotification(
                        completed
                            ? `"${title}" concluída.`
                            : `"${title}" voltou para pendentes.`
                    );
                }
            );
        });
}


activateTaskButtons();


/* -----------------------------
   EXCLUIR TAREFAS
------------------------------ */

function activateDeleteButtons() {

    document
        .querySelectorAll(".delete-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const task =
                        button.closest(
                            ".task-card"
                        );

                    const title =
                        task.querySelector(
                            "h3"
                        ).textContent;

                    task.remove();

                    updateCounters();

                    showNotification(
                        `A tarefa "${title}" foi excluída.`
                    );
                }
            );
        });
}


activateDeleteButtons();


/* -----------------------------
   CONTADORES
------------------------------ */

function updateCounters() {

    const tasks =
        document.querySelectorAll(
            ".task-card"
        );

    let completed = 0;

    let pending = 0;

    tasks.forEach(
        task => {

            if (
                task.classList.contains(
                    "completed"
                )
            ) {

                completed++;

            } else {

                pending++;
            }
        }
    );

    const total =
        completed + pending;

    const progress =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );

    completedCount.textContent =
        completed;

    pendingCount.textContent =
        pending;

    progressCount.textContent =
        `${progress}%`;
}


/* -----------------------------
   MODAL
------------------------------ */

function openModal() {

    taskModal.hidden = false;

    taskName.focus();

    document.body.style.overflow =
        "hidden";
}


function closeTaskModal() {

    taskModal.hidden = true;

    document.body.style.overflow =
        "";

    addTaskButton.focus();
}


addTaskButton.addEventListener(
    "click",
    openModal
);


closeModal.addEventListener(
    "click",
    closeTaskModal
);


/* Fechar clicando fora */

taskModal.addEventListener(
    "click",
    event => {

        if (
            event.target === taskModal
        ) {

            closeTaskModal();
        }
    }
);


/* Fechar com ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !taskModal.hidden
        ) {

            closeTaskModal();
        }
    }
);


/* -----------------------------
   CRIAR TAREFA
------------------------------ */

taskForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            taskName.value.trim();

        const description =
            document
                .getElementById(
                    "taskDescription"
                )
                .value
                .trim();

        const category =
            document
                .getElementById(
                    "taskCategory"
                )
                .value;


        if (!name) {

            showNotification(
                "Digite o nome da tarefa."
            );

            taskName.focus();

            return;
        }


        const article =
            document.createElement(
                "article"
            );

        article.className =
            "task-card";

        article.dataset.status =
            "pending";


        article.innerHTML = `

            <div class="task-check">

                <button
                    class="check-button"
                    type="button"
                    aria-label="Marcar tarefa como concluída"
                    aria-pressed="false"
                >
                    ○
                </button>

            </div>

            <div class="task-content">

                <h3></h3>

                <p></p>

                <span class="task-category"></span>

            </div>

            <button
                class="delete-button"
                type="button"
                aria-label=""
            >
                ×
            </button>

        `;


        article.querySelector(
            "h3"
        ).textContent = name;


        article.querySelector(
            "p"
        ).textContent =
            description ||
            "Nenhuma descrição informada.";


        article.querySelector(
            ".task-category"
        ).textContent =
            category;


        article.querySelector(
            ".delete-button"
        ).setAttribute(
            "aria-label",
            `Excluir tarefa: ${name}`
        );


        taskList.prepend(
            article
        );


        activateNewTaskButtons(
            article
        );

        updateCounters();

        taskForm.reset();

        closeTaskModal();

        showNotification(
            "Nova tarefa criada com sucesso."
        );
    }
);


/* -----------------------------
   ATIVAR BOTÕES DE UMA NOVA TAREFA
------------------------------ */

function activateNewTaskButtons(task) {

    const check =
        task.querySelector(
            ".check-button"
        );

    const deleteButton =
        task.querySelector(
            ".delete-button"
        );


    check.addEventListener(
        "click",
        () => {

            updateTaskStatus(task);

            const title =
                task.querySelector(
                    "h3"
                ).textContent;

            const completed =
                task.classList.contains(
                    "completed"
                );

            showNotification(
                completed
                    ? `"${title}" concluída.`
                    : `"${title}" voltou para pendentes.`
            );
        }
    );


    deleteButton.addEventListener(
        "click",
        () => {

            const title =
                task.querySelector(
                    "h3"
                ).textContent;

            task.remove();

            updateCounters();

            showNotification(
                `A tarefa "${title}" foi excluída.`
            );
        }
    );
}


/* -----------------------------
   NOTIFICAÇÕES
------------------------------ */

let notificationTimer;


function showNotification(message) {

    notification.textContent =
        message;

    notification.classList.add(
        "show"
    );

    clearTimeout(
        notificationTimer
    );

    notificationTimer =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            3000
        );
}


/* -----------------------------
   INICIALIZAÇÃO
------------------------------ */

updateCounters();
