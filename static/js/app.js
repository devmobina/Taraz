const STORAGE_KEY = "tarazDataV3";
const REMEMBERED_EMAIL_KEY = "tarazRememberedEmail";

const DEFAULT_DATA = {
    user: {
        name: "مبینا",
        email: "mobina@example.com",
        accountType: "personal"
    },
    theme: "dark",

    personal: {
        balance: 145300000,
        transactions: [
            { id: 1, title: "حقوق", category: "درآمد", amount: 25000000, type: "income", date: "۱۴۰۵/۰۵/۰۱" },
            { id: 2, title: "خرید سوپرمارکت", category: "مواد غذایی", amount: 1450000, type: "expense", date: "۱۴۰۵/۰۵/۰۳" },
            { id: 3, title: "اشتراک اینترنت", category: "قبوض", amount: 350000, type: "expense", date: "۱۴۰۵/۰۵/۰۵" },
            { id: 4, title: "تاکسی", category: "حمل و نقل", amount: 480000, type: "expense", date: "۱۴۰۵/۰۵/۰۷" },
            { id: 5, title: "پروژه فریلنسری", category: "درآمد", amount: 3700000, type: "income", date: "۱۴۰۵/۰۵/۱۰" }
        ],
        goals: [
            { id: 1, name: "خرید لپ‌تاپ", target: 50000000, saved: 22500000 },
            { id: 2, name: "سفر", target: 30000000, saved: 18000000 }
        ],
        budget: {
            total: 20000000,
            spent: 16250000,
            categories: [
                { name: "مواد غذایی", amount: 5400000 },
                { name: "حمل و نقل", amount: 3100000 },
                { name: "قبوض", amount: 2600000 },
                { name: "تفریح", amount: 2100000 }
            ]
        },
        reports: {
            "مرداد ۱۴۰۵": { income: 28700000, expense: 16250000, saving: 43, incomeGrowth: 12, expenseGrowth: -4 },
            "تیر ۱۴۰۵": { income: 25600000, expense: 17100000, saving: 33, incomeGrowth: 8, expenseGrowth: 3 }
        }
    },

    business: {
        datasetId: "business-v2",
        balance: 1850000000,
        income: 412500000,
        expense: 267800000,
        monthly: {
            labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
            income: [285, 312, 338, 356, 413, 441],
            expense: [198, 214, 226, 248, 268, 281]
        },
        transactions: [
            { id: 301, title: "فروش محصولات", category: "فروش", amount: 235000000, type: "income", date: "۱۴۰۵/۰۵/۰۲" },
            { id: 302, title: "حقوق کارکنان", category: "حقوق و مزایا", amount: 84000000, type: "expense", date: "۱۴۰۵/۰۵/۰۴" },
            { id: 303, title: "کمپین تبلیغاتی", category: "بازاریابی", amount: 46500000, type: "expense", date: "۱۴۰۵/۰۵/۰۷" },
            { id: 304, title: "قرارداد پشتیبانی", category: "فروش", amount: 177500000, type: "income", date: "۱۴۰۵/۰۵/۱۲" },
            { id: 305, title: "خدمات ابری", category: "فناوری", amount: 38200000, type: "expense", date: "۱۴۰۵/۰۵/۱۵" },
            { id: 306, title: "هزینه اداری", category: "اداری", amount: 26100000, type: "expense", date: "۱۴۰۵/۰۵/۱۸" }
        ],
        goals: [
            { id: 301, name: "افزایش سود عملیاتی", target: 220000000, saved: 154000000 },
            { id: 302, name: "توسعه فروش آنلاین", target: 300000000, saved: 198000000 },
            { id: 303, name: "ارتقای زیرساخت فناوری", target: 180000000, saved: 99000000 }
        ],
        departments: [
            { id: 11, name: "فروش و بازاریابی", manager: "نگار مرادی", budget: 260000000, spent: 181000000, employees: 21 },
            { id: 12, name: "فناوری اطلاعات", manager: "پارسا نادری", budget: 210000000, spent: 143000000, employees: 14 },
            { id: 13, name: "مالی و اداری", manager: "الهام کریمی", budget: 155000000, spent: 101000000, employees: 9 },
            { id: 14, name: "عملیات", manager: "کیان احمدی", budget: 190000000, spent: 129000000, employees: 17 }
        ],
        budget: {
            total: 815000000,
            spent: 554000000,
            categories: [
                { name: "فروش و بازاریابی", amount: 181000000 },
                { name: "فناوری اطلاعات", amount: 143000000 },
                { name: "مالی و اداری", amount: 101000000 },
                { name: "عملیات", amount: 129000000 }
            ]
        },
        employees: [
            { id: 11, name: "نگار مرادی", role: "مدیر فروش و بازاریابی", department: "فروش و بازاریابی", salary: 52000000, status: "فعال" },
            { id: 12, name: "پارسا نادری", role: "مدیر فناوری اطلاعات", department: "فناوری اطلاعات", salary: 61000000, status: "فعال" },
            { id: 13, name: "الهام کریمی", role: "مدیر مالی", department: "مالی و اداری", salary: 57000000, status: "فعال" },
            { id: 14, name: "کیان احمدی", role: "مدیر عملیات", department: "عملیات", salary: 49500000, status: "فعال" }
        ],
        reports: {
            "مرداد ۱۴۰۵": { income: 412500000, expense: 267800000, profit: 144700000, incomeGrowth: 18, expenseGrowth: 6 },
            "تیر ۱۴۰۵": { income: 356000000, expense: 248000000, profit: 108000000, incomeGrowth: 11, expenseGrowth: -2 },
            "خرداد ۱۴۰۵": { income: 338000000, expense: 226000000, profit: 112000000, incomeGrowth: 7, expenseGrowth: 3 }
        }
    },
    organization: {
        balance: 12800000000,
        income: 2400000000,
        expense: 1700000000,
        transactions: [
            { id: 201, title: "دریافت اعتبار پروژه", category: "پروژه‌ها", amount: 1200000000, type: "income", date: "۱۴۰۵/۰۵/۰۱" },
            { id: 202, title: "حقوق و مزایا", category: "حقوق و مزایا", amount: 680000000, type: "expense", date: "۱۴۰۵/۰۵/۰۵" },
            { id: 203, title: "خدمات عمومی", category: "خدمات عمومی", amount: 240000000, type: "expense", date: "۱۴۰۵/۰۵/۰۸" },
            { id: 204, title: "درآمد پروژه فناوری", category: "پروژه‌ها", amount: 1200000000, type: "income", date: "۱۴۰۵/۰۵/۱۲" },
            { id: 205, title: "هزینه فناوری", category: "فناوری", amount: 180000000, type: "expense", date: "۱۴۰۵/۰۵/۱۷" }
        ],
        goals: [
            { id: 201, name: "توسعه زیرساخت فناوری", target: 300000000, saved: 196000000 },
            { id: 202, name: "کاهش هزینه‌های جاری", target: 250000000, saved: 175000000 }
        ],
        units: [
            { id: 1, name: "واحد مالی", manager: "مریم موسوی", budget: 150000000, spent: 108000000, employees: 12 },
            { id: 2, name: "واحد منابع انسانی", manager: "سارا کریمی", budget: 210000000, spent: 156000000, employees: 20 },
            { id: 3, name: "واحد فناوری", manager: "امیر حسینی", budget: 280000000, spent: 196000000, employees: 17 }
        ],
        budget: {
            total: 640000000,
            spent: 460000000,
            categories: [
                { name: "واحد مالی", amount: 108000000 },
                { name: "واحد منابع انسانی", amount: 156000000 },
                { name: "واحد فناوری", amount: 196000000 }
            ]
        },
        employees: [
            { id: 1, name: "مریم موسوی", role: "مدیر مالی", unit: "واحد مالی", salary: 62000000, status: "فعال" },
            { id: 2, name: "سارا کریمی", role: "مدیر منابع انسانی", unit: "واحد منابع انسانی", salary: 58000000, status: "فعال" },
            { id: 3, name: "امیر حسینی", role: "مدیر فناوری", unit: "واحد فناوری", salary: 68000000, status: "فعال" }
        ],
        reports: {
            "مرداد ۱۴۰۵": { income: 2400000000, expense: 1700000000, profit: 700000000, incomeGrowth: 12, expenseGrowth: -4 },
            "تیر ۱۴۰۵": { income: 2240000000, expense: 1740000000, profit: 500000000, incomeGrowth: 9, expenseGrowth: 1 }
        }
    },

    admin: {
        stats: { activeUsers: 12800, totalUsers: 14260, transactions: 246000, satisfaction: 94 },
        users: [
            { name: "مریم احمدی", type: "شخصی", status: "فعال" },
            { name: "شرکت آریا", type: "شرکتی", status: "فعال" },
            { name: "سازمان پارس", type: "سازمانی", status: "فعال" },
            { name: "علی رضایی", type: "شخصی", status: "غیرفعال" }
        ],
        activity: [
            "ثبت حساب شرکتی جدید",
            "افزایش کاربران فعال سامانه",
            "ثبت تراکنش جدید",
            "به‌روزرسانی تنظیمات سامانه"
        ]
    }
};

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function loadData() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!stored) {
            const fresh = deepClone(DEFAULT_DATA);
            saveData(fresh);
            return fresh;
        }

        const businessData = stored.business?.datasetId === "business-v2"
            ? {
                ...deepClone(DEFAULT_DATA.business),
                ...stored.business,
                monthly: {
                    ...deepClone(DEFAULT_DATA.business.monthly),
                    ...(stored.business.monthly || {})
                }
            }
            : deepClone(DEFAULT_DATA.business);

        return {
            ...deepClone(DEFAULT_DATA),
            ...stored,
            user: {
                ...deepClone(DEFAULT_DATA.user),
                ...(stored.user || {})
            },
            personal: {
                ...deepClone(DEFAULT_DATA.personal),
                ...(stored.personal || {})
            },
            business: businessData,
            organization: {
                ...deepClone(DEFAULT_DATA.organization),
                ...(stored.organization || {})
            },
            admin: {
                ...deepClone(DEFAULT_DATA.admin),
                ...(stored.admin || {})
            }
        };
    } catch {
        return deepClone(DEFAULT_DATA);
    }
}

function getAccountType() {
    return data.user?.accountType || "personal";
}

function getAccountData() {
    return data[getAccountType()];
}

function money(value) {
    return `${new Intl.NumberFormat("fa-IR").format(Math.round(value || 0))} تومان`;
}

function shortMoney(value) {
    const amount = Number(value) || 0;

    if (amount >= 1_000_000_000) {
        return `${(amount / 1_000_000_000).toFixed(1)} میلیارد`;
    }

    if (amount >= 1_000_000) {
        return `${(amount / 1_000_000).toFixed(1)} میلیون`;
    }

    return new Intl.NumberFormat("fa-IR").format(amount);
}

function toast(message) {
    const element = document.getElementById("toast");

    if (!element) {
        return;
    }

    element.textContent = message;
    element.classList.add("show");

    window.clearTimeout(window.tarazToastTimer);
    window.tarazToastTimer = window.setTimeout(() => {
        element.classList.remove("show");
    }, 2500);
}

function applyTheme() {
    document.body.classList.toggle("light-mode", data.theme === "light");

    const icon = document.querySelector("#theme-btn i");

    if (icon) {
        icon.textContent = data.theme === "light" ? "☀️" : "🌙";
    }
}

function toggleTheme() {
    data.theme = data.theme === "light" ? "dark" : "light";
    saveData(data);
    applyTheme();
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("closed");
        console.log("Sidebar status:", sidebar.classList.contains("closed") ? "Closed" : "Open");
    } else {
        console.error("Sidebar element not found!");
    }
}

function setUser() {
    const isAdminPage = document.body.dataset.adminPage === "true";
    const name = isAdminPage ? "مدیر سامانه" : (data.user?.name || "کاربر");
    const email = isAdminPage ? "admin@taraz.com" : (data.user?.email || "");

    document.querySelectorAll("[data-user-name]").forEach((element) => {
        element.textContent = name;
    });

    document.querySelectorAll("[data-user-email]").forEach((element) => {
        element.textContent = email;
    });

    document.querySelectorAll("[data-user-initial]").forEach((element) => {
        element.textContent = name.charAt(0) || "ت";
    });
}

const NAVIGATION = {
    personal: [
        ["/personal/dashboard/", "⌂", "داشبورد"],
        ["/personal/transactions/", "↔", "تراکنش‌ها"],
        ["/personal/budget/", "◫", "بودجه"],
        ["/personal/goals/", "◎", "اهداف"],
        ["/personal/reports/", "▤", "گزارش‌ها"],
        ["/auth/profile/", "●", "پروفایل"],
        ["/base/setting/", "⚙", "تنظیمات"]
    ],
};

function renderNavigation() {
    const nav = document.querySelector(".nav");

    if (!nav) {
        return;
    }

    const file = location.pathname.split("/").pop() || "landing.html";
    const navigationType = document.body.dataset.adminPage === "true" ? "admin" : getAccountType();
    const items = NAVIGATION[navigationType] || NAVIGATION.personal;

    nav.innerHTML = items
        .map(([href, icon, label]) => {
            const targetFile = href.split("#")[0];
            return `
            <li>
                <a class="nav-link ${targetFile === file ? "active" : ""}" href="${href}">
                    <span class="nav-icon">${icon}</span>
                    <span class="nav-label">${label}</span>
                </a>
            </li>
        `;
        })
        .join("");
}


function enforceAccountAccess() {
    const required = document.body.dataset.requiredAccount;
    const adminPage = document.body.dataset.adminPage === "true";

    if (adminPage) {
        return;
    }

    if (!required || required === getAccountType()) {
        return;
    }

    const destinations = {
        personal: "/personal/dashboard/",      // مطابق با urls.py شما
        admin: "/admin/"
    };

    // گرفتن مسیر مقصد یا استفاده از پیش‌فرض
    const target = destinations[getAccountType()] || "/personal/dashboard/";
    
    console.log("Redirecting to account mismatch:", target);
    console.log("DESTINATIONS OBJECT:", destinations);
    window.location.replace(target);
}

function initCommon() {
    enforceAccountAccess();
    applyTheme();
    setUser();
    renderNavigation();

    document.getElementById("theme-btn")?.addEventListener("click", toggleTheme);
    document.getElementById("menu-btn")?.addEventListener("click", toggleMenu);

    document.querySelectorAll("[data-toast]").forEach((button) => {
        button.addEventListener("click", () => toast(button.dataset.toast));
    });

    document.querySelectorAll("[data-open-modal]").forEach((button) => {
        button.addEventListener("click", () => {
            document.getElementById(button.dataset.openModal)?.classList.add("show");
        });
    });

    document.querySelectorAll("[data-close-modal]").forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".modal-backdrop")?.classList.remove("show");
        });
    });
}

function getPersonalTotals() {
    const transactions = data?.personal?.transactions || [];

    const income = transactions
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const expense = transactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    // گرفتن موجودی فعلی (balance) با احتیاط
    const currentBalance = data?.personal?.balance || 0;

    return {
        income,
        expense,
        balance: currentBalance + income - expense,
        saving: income > 0 ? Math.round(((income - expense) / income) * 100) : 0
    };
}

function renderPersonalDashboard() {
    if (getAccountType() !== "personal") {
        return;
    }

    // 1. استفاده از مقدار جایگزین در صورت نبود دیتا
    const totals = getPersonalTotals();
    const personalTransactions = data?.personal?.transactions || [];

    setKpi("balance", shortMoney(totals.balance));
    setKpi("income", shortMoney(totals.income));
    setKpi("expense", shortMoney(totals.expense));
    setKpi("saving", `${totals.saving}٪`);

    const rows = document.getElementById("recent-rows");

    if (rows) {
        // 2. استفاده از متغیر ایمن شده (personalTransactions)
        rows.innerHTML = personalTransactions
            .slice(0, 5)
            .map((item) => `
                <tr>
                    <td>${item.title || "بدون عنوان"}</td>
                    <td>${item.category || "بدون دسته‌بندی"}</td>
                    <td class="${item.type === "income" ? "positive" : "negative"}">
                        ${item.type === "income" ? "+" : "-"}${money(item.amount || 0)}
                    </td>
                    <td>${item.date || "—"}</td>
                </tr>
            `)
            .join("");
    }

    renderGoals("dashboard-goals");

    const insight = document.getElementById("smart-insights");

    if (insight) {
        // 3. استفاده از متغیر ایمن شده برای پیدا کردن بیشترین هزینه
        const biggestExpense = [...personalTransactions]
            .filter((item) => item.type === "expense")
            .sort((a, b) => b.amount - a.amount)[0];

        insight.innerHTML = `
            <div class="insight">
                📊 درآمد ثبت‌شده: <b>${money(totals.income)}</b>
            </div>
            <div class="insight">
                💡 بیشترین هزینه: <b>${biggestExpense?.category || "—"}</b>
            </div>
            <div class="insight">
                🎯 نرخ پس‌انداز فعلی: <b>${totals.saving}٪</b>
            </div>
        `;
    }

    renderPersonalCharts();
}

function setKpi(name, value) {
    document.querySelectorAll(`[data-kpi="${name}"]`).forEach((element) => {
        element.textContent = value;
    });
}

function renderGoals(containerId = "goals-list") {
    const account = getAccountData();
    const container = document.getElementById(containerId);

    if (!container || !account?.goals) {
        return;
    }

    container.innerHTML = account.goals
        .map((goal) => {
            const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100));

            return `
                <div class="goal">
                    <div class="goal-head">
                        <strong>${goal.name}</strong>
                        <span>${percent}٪</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" style="width:${percent}%"></div>
                    </div>
                    <small class="muted">
                        ${money(goal.saved)} از ${money(goal.target)}
                    </small>
                </div>
            `;
        })
        .join("");
}


function destroyChart(canvasId) {
    const canvas = document.getElementById(canvasId);

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    const existing = Chart.getChart(canvas);

    if (existing) {
        existing.destroy();
    }
}

function renderPersonalCharts() {
    if (typeof Chart === "undefined") {
        return;
    }

    destroyChart("incomeExpenseChart");
    destroyChart("expenseChart");

    const lineCanvas = document.getElementById("incomeExpenseChart");

    if (lineCanvas) {
        new Chart(lineCanvas, {
            type: "line",
            data: {
                labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
                datasets: [
                    {
                        label: "درآمد",
                        data: [18, 22, 25, 24, 29, 31],
                        borderWidth: 3,
                        tension: 0.35
                    },
                    {
                        label: "هزینه",
                        data: [12, 14, 15, 17, 16, 18],
                        borderWidth: 3,
                        tension: 0.35
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    const donutCanvas = document.getElementById("expenseChart");

    if (donutCanvas) {
        // --- اصلاح اصلی اینجاست ---
        // استفاده از ?. برای جلوگیری از ارور undefined
        // اگر دسته‌بندی‌ها وجود نداشت، یک آرایه خالی برمی‌گرداند
        const categories = data?.personal?.budget?.categories || [];

        // اگر آرایه دسته‌بندی‌ها خالی بود، نمودار را رسم نکن تا ارور ندهد
        if (categories.length === 0) {
            console.warn("No categories found for expense chart.");
            return; 
        }

        new Chart(donutCanvas, {
            type: "doughnut",
            data: {
                labels: categories.map((item) => item.name || "بدون نام"),
                datasets: [
                    {
                        data: categories.map((item) => Number(item.amount) || 0),
                        borderWidth: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }
}

function renderBusinessDashboard() {
    if (getAccountType() !== "business") {
        return;
    }

    const account = data.business;

    setKpi("balance", shortMoney(account.balance));
    setKpi("income", shortMoney(account.income));
    setKpi("expense", shortMoney(account.expense));
    setKpi("profit", shortMoney(account.income - account.expense));

    renderBusinessCharts(account);
}

function renderBusinessCharts(account) {
    if (typeof Chart === "undefined") {
        return;
    }

    destroyChart("incomeExpenseChart");
    destroyChart("expenseChart");

    const lineCanvas = document.getElementById("incomeExpenseChart");

    if (lineCanvas) {
        const monthly = account.monthly;

        new Chart(lineCanvas, {
            type: "line",
            data: {
                labels: monthly.labels,
                datasets: [
                    {
                        label: "درآمد شرکت",
                        data: monthly.income,
                        borderWidth: 3,
                        tension: 0.35
                    },
                    {
                        label: "هزینه شرکت",
                        data: monthly.expense,
                        borderWidth: 3,
                        tension: 0.35
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    const donutCanvas = document.getElementById("expenseChart");

    if (donutCanvas) {
        new Chart(donutCanvas, {
            type: "doughnut",
            data: {
                labels: account.departments.map((item) => item.name),
                datasets: [
                    {
                        data: account.departments.map((item) => item.spent),
                        borderWidth: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }
}

function renderOrganizationDashboard() {
    if (getAccountType() !== "organization") {
        return;
    }

    const account = data.organization;

    setKpi("balance", shortMoney(account.balance));
    setKpi("income", shortMoney(account.income));
    setKpi("expense", shortMoney(account.expense));
    setKpi("profit", shortMoney(account.income - account.expense));

    renderManagementCharts(
        account.units.map((item) => item.name),
        account.units.map((item) => item.spent)
    );
}

function renderManagementCharts(labels, values) {
    if (typeof Chart === "undefined") {
        return;
    }

    destroyChart("incomeExpenseChart");
    destroyChart("expenseChart");

    const lineCanvas = document.getElementById("incomeExpenseChart");

    if (lineCanvas) {
        new Chart(lineCanvas, {
            type: "line",
            data: {
                labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
                datasets: [
                    {
                        label: "درآمد",
                        data: [245, 268, 281, 302, 329, 348],
                        borderWidth: 3,
                        tension: 0.35
                    },
                    {
                        label: "هزینه",
                        data: [182, 195, 204, 224, 216, 229],
                        borderWidth: 3,
                        tension: 0.35
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    const donutCanvas = document.getElementById("expenseChart");

    if (donutCanvas) {
        new Chart(donutCanvas, {
            type: "doughnut",
            data: {
                labels,
                datasets: [
                    {
                        data: values,
                        borderWidth: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }
}

function renderTransactions() {
    const account = getAccountData();
    const body = document.getElementById("transaction-body");

    if (!body || !account?.transactions) {
        return;
    }

    const query = (document.getElementById("transaction-search")?.value || "").trim();
    const type = document.getElementById("transaction-type")?.value || "all";

    const rows = account.transactions.filter((item) => {
        const matchesType = type === "all" || item.type === type;
        const text = `${item.title} ${item.category}`;
        return matchesType && (!query || text.includes(query));
    });

    body.innerHTML = rows.length
        ? rows.map((item) => `
            <tr>
                <td>${item.title}</td>
                <td>${item.category}</td>
                <td class="${item.type === "income" ? "positive" : "negative"}">
                    ${item.type === "income" ? "+" : "-"}${money(item.amount)}
                </td>
                <td>${item.date}</td>
                <td>
                    <button class="btn danger small" data-delete="${item.id}">حذف</button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="5" class="empty">تراکنشی پیدا نشد.</td></tr>`;

    body.querySelectorAll("[data-delete]").forEach((button) => {
        button.addEventListener("click", () => {
            const deleted = account.transactions.find(
                (item) => item.id === Number(button.dataset.delete)
            );

            account.transactions = account.transactions.filter(
                (item) => item.id !== Number(button.dataset.delete)
            );

            if (deleted) {
                if (account.budget && deleted.type === "expense") {
                    account.budget.spent = Math.max(0, account.budget.spent - deleted.amount);
                }

                if (getAccountType() === "business" || getAccountType() === "organization") {
                    if (deleted.type === "income") {
                        account.income = Math.max(0, account.income - deleted.amount);
                    } else {
                        account.expense = Math.max(0, account.expense - deleted.amount);
                    }
                }
            }

            saveData(data);
            renderTransactions();
            renderPersonalDashboard();
            renderBusinessDashboard();
            renderOrganizationDashboard();
            toast("تراکنش حذف شد");
        });
    });
}

function bindTransactionForm() {
    const form = document.getElementById("transaction-form");
    const account = getAccountData();

    if (!form || !account?.transactions) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const amount = Number(formData.get("amount"));
        const type = formData.get("type");

        if (!amount || amount <= 0) {
            toast("مبلغ تراکنش را به‌درستی وارد کنید.");
            return;
        }

        account.transactions.unshift({
            id: Date.now(),
            title: String(formData.get("title") || "").trim(),
            category: String(formData.get("category") || "سایر"),
            amount,
            type,
            date: "امروز"
        });

        if (account.budget && type === "expense") {
            account.budget.spent += amount;
        }

        if (getAccountType() === "business" || getAccountType() === "organization") {
            if (type === "income") {
                account.income += amount;
            } else {
                account.expense += amount;
            }
        }

        saveData(data);
        form.reset();
        document.querySelector(".modal-backdrop.show")?.classList.remove("show");
        renderTransactions();
        renderPersonalDashboard();
        renderBusinessDashboard();
        renderOrganizationDashboard();
        toast("تراکنش با موفقیت ثبت شد.");
    });
}

function bindGoalForm() {
    const form = document.getElementById("goal-form");
    const account = getAccountData();

    if (!form || !account?.goals) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        account.goals.push({
            id: Date.now(),
            name: String(formData.get("name") || "").trim(),
            target: Number(formData.get("target")),
            saved: Number(formData.get("saved") || 0)
        });

        saveData(data);
        form.reset();
        document.querySelector(".modal-backdrop.show")?.classList.remove("show");
        renderGoals();
        renderPersonalDashboard();
        toast("هدف جدید اضافه شد.");
    });
}


function bindProfile() {
    const form = document.getElementById("profile-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        data.user.name = String(formData.get("name")).trim();
        data.user.email = String(formData.get("email")).trim();

        saveData(data);
        setUser();
        toast("اطلاعات پروفایل ذخیره شد.");
    });
}

function renderManagementList() {
    const departmentList = document.getElementById("department-list");
    const unitList = document.getElementById("unit-list");

    if (departmentList && getAccountType() === "business") {
        departmentList.innerHTML = data.business.departments
            .map((item) => managementCard(item, "دپارتمان"))
            .join("");
    }

    if (unitList && getAccountType() === "organization") {
        unitList.innerHTML = data.organization.units
            .map((item) => managementCard(item, "واحد"))
            .join("");
    }
}

function managementCard(item, label) {
    const percent = Math.round((item.spent / item.budget) * 100);

    return `
        <article class="department-card">
            <div class="panel-head">
                <div>
                    <h3>${item.name}</h3>
                    <small class="muted">مسئول: ${item.manager}</small>
                </div>
                <span class="badge ${percent > 90 ? "danger" : "success"}">
                    ${percent}٪ مصرف
                </span>
            </div>

            <div class="stat-row">
                <span>بودجه</span>
                <b>${money(item.budget)}</b>
            </div>

            <div class="stat-row">
                <span>مصرف</span>
                <b>${money(item.spent)}</b>
            </div>

            <div class="stat-row">
                <span>تعداد کارکنان</span>
                <b>${item.employees}</b>
            </div>

            <div class="progress">
                <div
                    class="progress-bar"
                    style="width:${Math.min(100, percent)}%"
                ></div>
            </div>
        </article>
    `;
}

function renderEmployees() {
    const body = document.getElementById("employee-body");

    if (!body) {
        return;
    }

    const accountType = getAccountType();

    if (accountType === "business") {
        body.innerHTML = data.business.employees
            .map((employee) => employeeRow(employee, "دپارتمان"))
            .join("");

        const description = document.getElementById("employee-description");
        if (description) {
            description.textContent = "فهرست کارکنان، سمت‌ها و دپارتمان‌های شرکت را بررسی کنید.";
        }
        return;
    }

    if (accountType === "organization") {
        body.innerHTML = data.organization.employees
            .map((employee) => employeeRow(employee, "واحد"))
            .join("");

        const description = document.getElementById("employee-description");
        if (description) {
            description.textContent = "فهرست کارکنان، سمت‌ها و واحدهای سازمان را بررسی کنید.";
        }
    }
}

function employeeRow(employee, structureLabel) {
    const structure = employee.department || employee.unit;

    return `
        <tr>
            <td>
                <div class="employee">
                    <div class="avatar-lg">${employee.name.charAt(0)}</div>
                    <span>${employee.name}</span>
                </div>
            </td>
            <td>${employee.role}</td>
            <td>${structure}</td>
            <td>${money(employee.salary)}</td>
            <td>
                <span class="badge success">${employee.status}</span>
            </td>
        </tr>
    `;
}

function renderBudgetPage() {
    const account = getAccountData();

    if (!account?.budget) {
        return;
    }

    const { total, spent, categories } = account.budget;
    const remaining = total - spent;
    const percent = Math.round((spent / total) * 100);

    setKpi("budget-total", shortMoney(total));
    setKpi("budget-spent", shortMoney(spent));
    setKpi("budget-remaining", shortMoney(remaining));
    setKpi("budget-percent", `${percent}٪`);

    const progress = document.getElementById("budget-progress");

    if (progress) {
        progress.style.width = `${Math.min(100, percent)}%`;
    }

    const categoryBox = document.getElementById("budget-categories");

    if (categoryBox) {
        categoryBox.innerHTML = categories
            .map(
                (item) => `
                    <div class="stat-row">
                        <span>${item.name}</span>
                        <b>${shortMoney(item.amount)}</b>
                    </div>
                `
            )
            .join("");
    }

    const advice = document.getElementById("budget-advice");

    if (advice) {
        const remainingPercent = Math.max(0, 100 - percent);

        advice.innerHTML =
            percent >= 85
                ? `
                    <div class="insight warning-box">
                        ⚠️ ${remainingPercent}٪ از بودجه باقی مانده است.
                        در این شرایط، هزینه‌های غیرضروری را با دقت بیشتری کنترل کنید.
                    </div>
                `
                : `
                    <div class="insight">
                        🎯 وضعیت بودجه متعادل است. با ادامه همین روند، فضای مناسبی
                        برای هزینه‌های پیش‌بینی‌نشده خواهید داشت.
                    </div>
                `;
    }
}

const REPORT_LABELS = {
    personal: {
        income: "درآمد",
        expense: "هزینه",
        result: "نرخ پس‌انداز"
    },
    business: {
        income: "درآمد شرکت",
        expense: "هزینه شرکت",
        result: "سود خالص"
    },
    organization: {
        income: "درآمد سازمان",
        expense: "هزینه سازمان",
        result: "سود خالص"
    }
};

function renderReports() {
    const accountType = getAccountType();
    const account = data[accountType];

    if (!account?.reports) {
        return;
    }

    const selector = document.getElementById("report-month");
    const month = selector?.value || Object.keys(account.reports)[0];
    const report = account.reports[month];

    if (!report) {
        return;
    }

    setKpi("report-income", shortMoney(report.income));
    setKpi("report-expense", shortMoney(report.expense));

    const result = accountType === "personal"
        ? `${report.saving}٪`
        : shortMoney(report.profit);

    setKpi("report-result", result);

    const incomeGrowth = document.getElementById("report-income-growth");
    const expenseGrowth = document.getElementById("report-expense-growth");

    if (incomeGrowth) {
        incomeGrowth.textContent = `${report.incomeGrowth > 0 ? "+" : ""}${report.incomeGrowth}٪`;
    }

    if (expenseGrowth) {
        expenseGrowth.textContent = `${report.expenseGrowth > 0 ? "+" : ""}${report.expenseGrowth}٪`;
    }

    const resultLabel = document.getElementById("report-result-label");

    if (resultLabel) {
        resultLabel.textContent = REPORT_LABELS[accountType].result;
    }
}

function renderAdminPanel() {
    if (document.body.dataset.adminPage !== "true") {
        return;
    }

    const admin = data.admin || DEFAULT_DATA.admin;
    setKpi("admin-active-users", new Intl.NumberFormat("fa-IR").format(admin.stats.activeUsers));
    setKpi("admin-total-users", new Intl.NumberFormat("fa-IR").format(admin.stats.totalUsers));
    setKpi("admin-transactions", new Intl.NumberFormat("fa-IR").format(admin.stats.transactions));
    setKpi("admin-satisfaction", `${admin.stats.satisfaction}٪`);

    const users = document.getElementById("admin-users-body");
    if (users) {
        users.innerHTML = admin.users.map((user) => `
            <tr>
                <td>${user.name}</td>
                <td>${user.type}</td>
                <td><span class="badge ${user.status === "فعال" ? "success" : "danger"}">${user.status}</span></td>
            </tr>
        `).join("");
    }

    const activity = document.getElementById("admin-activity-list");
    if (activity) {
        activity.innerHTML = admin.activity.map((item) => `<div class="insight">${item}</div>`).join("");
    }
}

function setAccountTypeLabel() {
    const label = document.getElementById("account-type-label");

    if (!label) {
        return;
    }

    const labels = {
        personal: "حساب شخصی",
        business: "حساب شرکتی",
        organization: "حساب سازمانی",
        admin: "مدیر سامانه"
    };

    label.value = labels[getAccountType()] || "حساب شخصی";
}

function setupRegister() {
    const form = document.getElementById("register-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const password = document.getElementById("reg-password").value;
        const confirm = document.getElementById("confirm-password").value;

        if (password.length < 8) {
            toast("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }

        if (password !== confirm) {
            toast("رمز عبور و تکرار آن یکسان نیست.");
            return;
        }

        const accountType = document.getElementById("account-type").value;

        data.user = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("reg-email").value.trim(),
            accountType
        };

        saveData(data);
        toast("حساب با موفقیت ساخته شد.");

        window.setTimeout(() => {
            window.location.href = "{% url 'login_url' %}";
        }, 700);
    });
}

function setupLogin() {
    const form = document.getElementById("login-form");

    // اگر فرم در این صفحه وجود ندارد، کلاً از تابع خارج شو
    if (!form) {
        return;
    }

    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    
    // پیدا کردن المان‌ها با استفاده از متغیر برای جلوگیری از تکرار و چک کردن وجود آن‌ها
    const emailInput = document.getElementById("email");
    const rememberCheckbox = document.getElementById("remember");

    if (rememberedEmail && emailInput) {
        emailInput.value = rememberedEmail;
    }
    
    if (rememberedEmail && rememberCheckbox) {
        rememberCheckbox.checked = true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // بررسی مجدد برای اطمینان از عدم کرش هنگام سابمیت
        if (!emailInput) return;

        const email = emailInput.value.trim();

        if (rememberCheckbox && rememberCheckbox.checked) {
            localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
        } else {
            localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }

        if (typeof data !== 'undefined' && data.user) {
            const destinations = {
                personal: "/dashboard/personal/", 
            };
            
            const targetUrl = destinations[data.user.accountType] || "/dashboard/personal/";
            console.log("Redirecting to:", targetUrl); // برای تست در کنسول
            window.location.href = targetUrl;

        } else {
            console.error("User data is not defined. Cannot redirect.");
            window.location.href = "/dashboard/personal/";
        }
    });
}

function setupProfile() {
    const nameInput = document.getElementById("profile-name");
    const emailInput = document.getElementById("profile-email");

    if (nameInput) {
        nameInput.value = data.user.name;
    }

    if (emailInput) {
        emailInput.value = data.user.email;
    }

    setAccountTypeLabel();
}

function setupReports() {
    const selector = document.getElementById("report-month");

    if (!selector) {
        return;
    }

    const account = data[getAccountType()];

    selector.innerHTML = Object.keys(account.reports || {})
        .map((month) => `<option value="${month}">${month}</option>`)
        .join("");

    selector.addEventListener("change", renderReports);
    renderReports();
}

function setupSettings() {
    const select = document.getElementById("setting-theme");

    if (!select) {
        return;
    }

    select.value = data.theme;

    select.addEventListener("change", () => {
        data.theme = select.value;
        saveData(data);
        applyTheme();
        toast("تنظیمات ذخیره شد.");
    });
}

function setupLandingCounters() {
    const counters = {
        activeUsers: "۱۲,۸۰۰+",
        transactions: "۲۴۶,۰۰۰+",
        satisfaction: "۹۴٪"
    };

    Object.entries(counters).forEach(([key, value]) => {
        const element = document.querySelector(`[data-stat="${key}"]`);

        if (element) {
            element.textContent = value;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initCommon();
    setupRegister();
    setupLogin();
    setupProfile();
    setupReports();
    setupSettings();
    setupLandingCounters();

    renderPersonalDashboard();
    renderBusinessDashboard();
    renderOrganizationDashboard();
    renderTransactions();
    renderManagementList();
    renderEmployees();
    renderBudgetPage();
    renderReports();
    renderAdminPanel();

    bindTransactionForm();
    bindGoalForm();

    document
        .getElementById("transaction-search")
        ?.addEventListener("input", renderTransactions);

    document
        .getElementById("transaction-type")
        ?.addEventListener("change", renderTransactions);
});

document.addEventListener("DOMContentLoaded", () => {
    initCommon();
});


