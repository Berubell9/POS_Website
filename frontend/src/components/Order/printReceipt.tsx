type ReceiptItem = {
    product_name: string;
    quantity: number;
    total: number;
};

type ReceiptOrder = {
    order_number: string;
    queue_number: number;
    table_id?: number;
    sub_total: number;
    vat_amount: number;
    total_amount: number;
    created_at: string;
    tables?: {
        table_number: string | number;
    } | null;
    items?: ReceiptItem[];
};

const formatMoney = (value: number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
});

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH");
};

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const printReceipt = (order: ReceiptOrder) => {
    const receiptWindow = window.open("", "_blank", "width=420,height=900");

    if (!receiptWindow) {
        alert("ไม่สามารถเปิดหน้าต่างพิมพ์ได้");
        return;
    }

    const itemsHtml = (order.items || [])
        .map(
            (item) => `
            <tr>
                <td>${item.product_name}<br><small>x${item.quantity}</small></td>
                <td style="text-align:right;">฿${formatMoney(item.total)}</td>
            </tr>
            `
        )
        .join("");

    const tableNumber = order.tables?.table_number ?? order.table_id ?? "-";

    const html = `
        <html>
            <head>
                <title>Receipt ${order.order_number}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 16px; }
                    .receipt { max-width: 320px; margin: auto; }
                    .meta-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
                    .divider { border-top: 1px dashed #999; margin: 12px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    td { padding: 6px 0; vertical-align: top; }
                    .center { text-align: center; }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <div class="center">
                        <h2>คิว : ${String(order.queue_number).padStart(3, "0")}</h2>
                        <h1>ร้านเครปญี่ปุ่น</h1>
                        <h3>ใบเสร็จรับเงิน</h3>
                    </div>

                    <div class="divider"></div>

                    <div class="meta-row">
                        <span>เลขออเดอร์</span>
                        <span>${order.order_number}</span>
                    </div>

                    <div class="meta-row">
                        <span>โต๊ะ</span>
                        <span>${tableNumber}</span>
                    </div>

                    <div class="meta-row">
                        <span>วันที่</span>
                        <span>${formatDate(order.created_at)}</span>
                    </div>

                    <div class="meta-row">
                        <span>เวลา</span>
                        <span>${formatTime(order.created_at)}</span>
                    </div>

                    <div class="divider"></div>

                    <table>
                        ${itemsHtml}
                    </table>

                    <div class="divider"></div>

                    <div class="meta-row">
                        <span>ยอดก่อน VAT</span>
                        <span>฿${formatMoney(order.sub_total)}</span>
                    </div>

                    <div class="meta-row">
                        <span>VAT 7%</span>
                        <span>฿${formatMoney(order.vat_amount)}</span>
                    </div>

                    <div class="meta-row" style="font-weight:bold; font-size:18px;">
                        <span>รวมทั้งหมด</span>
                        <span>฿${formatMoney(order.total_amount)}</span>
                    </div>

                    <div class="divider"></div>

                    <div class="center">ขอบคุณที่ใช้บริการค่ะ</div>
                </div>

                <script>
                window.onload = function () {
                    window.print();
                    window.onafterprint = function () {
                    window.close();
                    };
                };
                </script>
            </body>
        </html>
    `;

    receiptWindow.document.open();
    receiptWindow.document.write(html);
    receiptWindow.document.close();
};