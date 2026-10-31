
// =====================================
// ABHISHEK TRADING ACADEMY
// JavaScript
// =====================================


// 1. COURSE NAVIGATION

function show(id) {

    document.querySelectorAll("main section").forEach(section => {
        section.classList.remove("active");
    });

    const selected = document.getElementById(id);

    if (selected) {
        selected.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// 2. RISK CALCULATOR

function calculateRisk() {

    const capital = Number(document.getElementById("capital").value);
    const percentage = Number(document.getElementById("riskpercent").value);

    if (capital <= 0 || percentage <= 0 || percentage > 100) {
        alert("Please enter valid values!");
        return;
    }

    const risk = capital * percentage / 100;

    document.getElementById("riskresult").textContent =
        "Your Maximum Planned Risk: ₹" + risk.toFixed(2);
}


// 3. TRADING JOURNAL

let trades = [];

try {
    trades = JSON.parse(localStorage.getItem("abhishekTrades")) || [];
} catch (error) {
    trades = [];
}


function displayTrades() {

    const table = document.getElementById("trades");

    if (!table) return;

    table.innerHTML = "";

    trades.forEach(trade => {

        const row = document.createElement("tr");

        [trade.stock, trade.entry, trade.exit,
         "₹" + trade.pl.toFixed(2)].forEach(value => {

            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);

        });

        table.appendChild(row);
    });
}


function saveTrade() {

    const stock = document.getElementById("stock").value.trim();
    const entry = Number(document.getElementById("entry").value);
    const exit = Number(document.getElementById("exit").value);
    const qty = Number(document.getElementById("qty").value);

    if (!stock || entry <= 0 || exit <= 0 || qty <= 0) {
        alert("Please fill all details correctly!");
        return;
    }

    const pl = (exit - entry) * qty;

    trades.push({
        stock: stock,
        entry: entry,
        exit: exit,
        quantity: qty,
        pl: pl
    });

    try {
        localStorage.setItem("abhishekTrades", JSON.stringify(trades));
    } catch (error) {
        trades.pop();
        alert("Unable to save trade!");
        return;
    }

    displayTrades();

    document.getElementById("journalresult").textContent =
        "Trade Saved! P/L: ₹" + pl.toFixed(2);

    document.getElementById("stock").value = "";
    document.getElementById("entry").value = "";
    document.getElementById("exit").value = "";
    document.getElementById("qty").value = "";
}


// 4. QUIZ SYSTEM

function checkQuiz() {

    let score = 0;

    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.getElementById("q3").value;

    if (!q1 || !q2 || !q3) {
        alert("Answer all questions!");
        return;
    }

    if (q1 === "b") score++;
    if (q2 === "c") score++;
    if (q3 === "a") score++;

    document.getElementById("quizresult").textContent =
        "Your Score: " + score + "/3";
}


// 5. LOAD SAVED TRADES

displayTrades();

cons
// ==========================================
// ABHISHEK TRADING ACADEMY - JAVASCRIPT
// ==========================================


// 1. INITIAL DATA
let balance = 100000;
let totalTrades = 0;
let totalPnL = 0;

let positions = [];
let journalEntries = [];
let completedLessons = [];
let currentLesson = null;


// 2. COURSE LESSONS
const lessons = [
    {
        title: "Trading Basics",
        content: "Trading ka matlab financial market mein stocks ko buy aur sell karna hai. Stock market mein NSE aur BSE jaise exchanges hote hain. Trading se pehle market, risk aur order types samajhna zaroori hai."
    },
    {
        title: "Candlestick Patterns",
        content: "Candlestick price movement dikhati hai. Green candle bullish movement aur red candle bearish movement dikhati hai. Open, High, Low aur Close ko OHLC kehte hain. Hammer, Doji aur Engulfing important patterns hain."
    },
    {
        title: "Support & Resistance",
        content: "Support ek aisa price zone hai jahan buying pressure aa sakta hai. Resistance ek aisa zone hai jahan selling pressure aa sakta hai. Inhe exact line ke bajay zone ki tarah samajhna behtar hai."
    },
    {
        title: "Trend Analysis",
        content: "Uptrend mein Higher High (HH) aur Higher Low (HL) bante hain. Downtrend mein Lower High (LH) aur Lower Low (LL) bante hain. Sideways market mein price ek range ke andar move karta hai."
    },
    {
        title: "Moving Average",
        content: "Moving Average price ka average dikhata hai. 20 EMA short-term trend aur 50 MA medium-term trend samajhne mein madad kar sakte hain. Indicator ko akela entry signal mat samjho."
    },
    {
        title: "Volume Analysis",
        content: "Volume batata hai ki kisi period mein kitni trading hui. Price breakout ke saath strong volume breakout ki strength ko support kar sakta hai. Low volume breakout mein caution rakho."
    },
    {
        title: "Price Action",
        content: "Price Action ka matlab candles, swing highs, swing lows aur market structure ke through price ko analyse karna hai. Trend, support-resistance aur candle confirmation important concepts hain."
    },
    {
        title: "RSI Indicator",
        content: "RSI ek momentum indicator hai jo 0 se 100 ke beech move karta hai. RSI 70 ke upar overbought aur 30 ke neeche oversold condition dikha sakta hai. Ye automatic buy ya sell signal nahi hai."
    },
    {
        title: "Risk Management",
        content: "Risk management trading ka important part hai. Stop loss, position sizing aur risk-reward ratio samjho. Ek trade mein kitna paisa risk karna hai, ye entry se pehle decide karo."
    },
    {
        title: "Liquidity & Liquidity Sweep",
        content: "Liquidity un price areas par collect ho sakti hai jahan bahut se orders aur stop losses hote hain. Previous highs ke upar buy-side liquidity aur previous lows ke neeche sell-side liquidity ho sakti hai. Sweep ke baad confirmation zaroor dekho."
    },
    {
        title: "Market Structure",
        content: "Market structure price ke swing highs aur swing lows ko samajhne ka tarika hai. HH aur HL uptrend ko, jabki LH aur LL downtrend ko show karte hain."
    },
    {
        title: "Break of Structure",
        content: "Break of Structure (BOS) tab hota hai jab price important previous swing high ya swing low ko break karta hai. Change of Character (CHoCH) possible trend shift ka early indication ho sakta hai."
    },
    {
        title: "Order Blocks",
        content: "Order Block ek price zone hai jise kuch trading approaches mein possible institutional buying ya selling area ke roop mein analyse kiya jata hai. Har zone valid nahi hota; structure aur confirmation dekho."
    },
    {
        title: "Fair Value Gap",
        content: "Fair Value Gap (FVG) price chart par three-candle pattern se identify hone wala imbalance area hai. Price future mein is area ko revisit kar sakta hai, lekin ye guaranteed nahi hai."
    },
    {
        title: "Trading Psychology",
        content: "Fear, greed aur revenge trading se bachna seekho. Trading plan follow karo. Loss ke baad turant trade recover karne ki koshish mat karo."
    },
    {
        title: "Intraday Trading",
        content: "Intraday trading mein position same trading day ke andar close ki jaati hai. Ismein volatility aur risk zyada ho sakta hai. Stop loss aur discipline important hain."
    },
    {
        title: "Swing Trading",
        content: "Swing trading mein trades kuch din ya hafton tak hold kiye ja sakte hain. Daily aur weekly charts se trend, support-resistance aur risk analyse karo."
    },
    {
        title: "Advanced Trading Strategy",
        content: "Advanced analysis mein market structure, liquidity, price action, volume aur risk management ko combine kiya ja sakta hai. Pehle paper trading mein strategy test karo."
    }
];


// 3. SAVE AND LOAD DATA
function saveData() {
    const data = {
        balance,
        totalTrades,
        totalPnL,
        positions,
        journalEntries,
        completedLessons
    };

    localStorage.setItem(
        "abhishekTradingData",
        JSON.stringify(data)
    );
}


function loadData() {
    const savedData = localStorage.getItem("abhishekTradingData");

    if (savedData) {
        try {
            const data = JSON.parse(savedData);

            balance = data.balance ?? 100000;
            totalTrades = data.totalTrades ?? 0;
            totalPnL = data.totalPnL ?? 0;
            positions = data.positions ?? [];
            journalEntries = data.journalEntries ?? [];
            completedLessons = data.completedLessons ?? [];
        } catch (error) {
            console.error("Saved data could not be loaded:", error);
        }
    }
}


// 4. FORMAT CURRENCY
function formatMoney(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}


// 5. UPDATE DASHBOARD
function updateDashboard() {
    document.getElementById("balance").textContent =
        formatMoney(balance);

    document.getElementById("totalTrades").textContent =
        totalTrades;

    const pnlElement = document.getElementById("totalPnL");

    pnlElement.textContent = formatMoney(totalPnL);
    pnlElement.style.color =
        totalPnL >= 0 ? "#22c55e" : "#ef4444";

    const progress = Math.round(
        (completedLessons.length / lessons.length) * 100
    );

    document.getElementById("progress").textContent =
        progress + "%";
}


// 6. BUY STOCK
function buyStock() {
    const stockInput = document.getElementById("stockName");
    const priceInput = document.getElementById("tradePrice");
    const quantityInput = document.getElementById("tradeQuantity");

    const stock = stockInput.value.trim().toUpperCase();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);

    const message = document.getElementById("tradeMessage");

    if (!stock || !Number.isFinite(price) || !Number.isInteger(quantity)
        || price <= 0 || quantity <= 0) {
        message.textContent = "Please enter valid stock details.";
        message.style.color = "#ef4444";
        return;
    }

    const investment = price * quantity;

    if (investment > balance) {
        message.textContent = "Insufficient virtual balance!";
        message.style.color = "#ef4444";
        return;
    }

    balance -= investment;

    positions.push({
        id: Date.now() + Math.random(),
        stock,
        price,
        quantity
    });

    totalTrades++;

    message.textContent =
        "Paper BUY successful: " + stock;

    message.style.color = "#22c55e";

    saveData();
    updateDashboard();
    renderPositions();

    priceInput.value = "";
    quantityInput.value = "";
}


// 7. SELL STOCK
function sellStock() {
    const stockInput = document.getElementById("stockName");
    const priceInput = document.getElementById("tradePrice");
    const quantityInput = document.getElementById("tradeQuantity");

    const stock = stockInput.value.trim().toUpperCase();
    const price = Number(priceInput.value);
    let quantity = Number(quantityInput.value);

    const message = document.getElementById("tradeMessage");

    if (!stock || !Number.isFinite(price) || !Number.isInteger(quantity)
        || price <= 0 || quantity <= 0) {
        message.textContent = "Please enter valid sell details.";
        message.style.color = "#ef4444";
        return;
    }

    const availableQuantity = positions
        .filter(position => position.stock === stock)
        .reduce((sum, position) => sum + position.quantity, 0);

    if (quantity > availableQuantity) {
        message.textContent = "You do not own enough quantity!";
        message.style.color = "#ef4444";
        return;
    }

    let remaining = quantity;
    let realizedPnL = 0;

    for (let i = 0; i < positions.length && remaining > 0;) {
        const position = positions[i];

        if (position.stock !== stock) {
            i++;
            continue;
        }

        const soldQuantity = Math.min(
            position.quantity,
            remaining
        );

        realizedPnL +=
            (price - position.price) * soldQuantity;

        position.quantity -= soldQuantity;
        remaining -= soldQuantity;

        if (position.quantity === 0) {
            positions.splice(i, 1);
        } else {
            i++;
        }
    }

    balance += price * quantity;
    totalPnL += realizedPnL;
    totalTrades++;

    message.textContent =
        "Paper SELL successful! P/L: " + formatMoney(realizedPnL);

    message.style.color =
        realizedPnL >= 0 ? "#22c55e" : "#ef4444";

    saveData();
    updateDashboard();
    renderPositions();

    priceInput.value = "";
    quantityInput.value = "";
}


// 8. DISPLAY OPEN POSITIONS
function renderPositions() {
    const table = document.getElementById("positionsTable");

    if (positions.length === 0) {
        table.innerHTML =
            '<tr><td colspan="5">No open positions</td></tr>';
        return;
    }

    table.innerHTML = positions.map(position => `
        <tr>
            <td>${escapeHTML(position.stock)}</td>
            <td>${formatMoney(position.price)}</td>
            <td>${position.quantity}</td>
            <td>${formatMoney(position.price * position.quantity)}</td>
            <td>
                <button onclick="closePosition('${position.id}')">
                    Close
                </button>
            </td>
        </tr>
    `).join("");
}


// Close full position at its original price (demo shortcut)
function closePosition(id) {
    const position = positions.find(
        item => String(item.id) === String(id)
    );

    if (!position) return;

    const stockInput = document.getElementById("stockName");
    const priceInput = document.getElementById("tradePrice");
    const quantityInput = document.getElementById("tradeQuantity");

    stockInput.value = position.stock;
    priceInput.value = position.price;
    quantityInput.value = position.quantity;

    sellStock();
}


// 9. COURSE LESSONS
function openLesson(index) {
    if (!lessons[index]) return;

    currentLesson = index;

    document.getElementById("lessonTitle").textContent =
        lessons[index].title;

    document.getElementById("lessonContent").textContent =
        lessons[index].content;

    const button = document.getElementById("completeLessonBtn");

    button.textContent = completedLessons.includes(index)
        ? "Completed ✓"
        : "Mark as Completed";

    document.getElementById("lessonViewer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// 10. COMPLETE LESSON
function completeLesson() {
    if (currentLesson === null) {
        alert("Please select a lesson first.");
        return;
    }

    if (!completedLessons.includes(currentLesson)) {
        completedLessons.push(currentLesson);
    }

    document.getElementById("completeLessonBtn").textContent =
        "Completed ✓";

    saveData();
    updateDashboard();
}


// 11. ESCAPE HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}


// 12. ADD JOURNAL ENTRY
function addJournalEntry() {
    const stock = document.getElementById("journalStock").value.trim();
    const strategy = document.getElementById("journalStrategy").value.trim();
    const result = document.getElementById("journalResult").value;
    const notes = document.getElementById("journalNotes").value.trim();

    if (!stock || !strategy) {
        alert("Please enter stock name and strategy.");
        return;
    }

    const entry = {
        date: new Date().toLocaleDateString("en-IN"),
        stock,
        strategy,
        result,
        notes
    };

    journalEntries.unshift(entry);

    saveData();
    renderJournal();

    document.getElementById("journalStock").value = "";
    document.getElementById("journalStrategy").value = "";
    document.getElementById("journalNotes").value = "";

    alert("Journal entry saved successfully!");
}


// 13. DISPLAY JOURNAL
function renderJournal() {
    const table = document.getElementById("journalTable");

    if (journalEntries.length === 0) {
        table.innerHTML =
            '<tr><td colspan="5">No journal entries yet.</td></tr>';
        return;
    }

    table.innerHTML = journalEntries.map(entry => `
        <tr>
            <td>${escapeHTML(entry.date)}</td>
            <td>${escapeHTML(entry.stock)}</td>
            <td>${escapeHTML(entry.strategy)}</td>
            <td>${escapeHTML(entry.result)}</td>
            <td>${escapeHTML(entry.notes)}</td>
        </tr>
    `).join("");
}


// 14. EXPORT JOURNAL AS CSV
function exportJournal() {
    if (journalEntries.length === 0) {
        alert("No journal entries to export.");
        return;
    }

    const headers = [
        "Date",
        "Stock",
        "Strategy",
        "Result",
        "Notes"
    ];

    const rows = journalEntries.map(entry => [
        entry.date,
        entry.stock,
        entry.strategy,
        entry.result,
        entry.notes
    ]);

    const csv = [headers, ...rows]
        .map(row =>
            row.map(value =>
                '"' + String(value).replace(/"/g, '""') + '"'
            ).join(",")
        )
        .join("\n");

    const blob = new Blob(
        ["\uFEFF" + csv],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Abhishek_Trading_Journal.csv";

    link.click();

    URL.revokeObjectURL(url);
}


// 15. SAMPLE MARKET CHART
function createMarketChart() {
    const canvas = document.getElementById("marketChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    const labels = [];
    const prices = [];

    let price = 2500;

    for (let i = 0; i < 30; i++) {
        labels.push("Day " + (i + 1));

        price += (Math.random() - 0.48) * 45;

        prices.push(Number(price.toFixed(2)));
    }

    new Chart(canvas, {
        type: "line",

        data: {
            labels: labels,

            datasets: [{
                label: "Sample Price",
                data: prices,
                borderColor: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.10)",
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 2
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: "#aaaaaa"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.06)"
                    }
                },

                y: {
                    ticks: {
                        color: "#aaaaaa"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.06)"
                    }
                }
            }
        }
    });
}


// 16. START WEBSITE
document.addEventListener("DOMContentLoaded", function () {

    loadData();

    updateDashboard();

    renderPositions();

    renderJournal();

    createMarketChart();

    console.log("Abhishek Trading Academy Loaded Successfully!");

});
le.log("Abhishek Trading Academy Loaded!");
