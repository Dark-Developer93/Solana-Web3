# AlphaNeural Frontend Challenge

Welcome to the AlphaNeural Frontend Task!  
Your objective is to build a simple Next.js application that allows users to **connect their Solana wallet** and **transfer SOL** to another address.

---

## Requirements

- Create a **Next.js** app (latest version recommended).
- Implement wallet connection (e.g., using `@solana/wallet-adapter`).
- Enable users to **send SOL** to a specified recipient address.

---

## Functionality Details

1. **Home Page:**

   - Display a **"Connect Wallet"** button.
   - When clicked, open the wallet adapter modal and prompt the user to connect their Solana wallet.

2. **After Connection:**

   - Show:
     - An **input field** for the **recipient address**.
     - An **input field** for the **amount of SOL** to send.
     - A **"Send SOL"** button to initiate the transfer.

3. **On Transfer:**
   - Perform a **SOL transfer transaction** to the specified recipient address.
   - After successful submission, display a **toast notification** with the **transaction signature/hash** and a link to view it on **Solana Explorer**.

---

## Bonus Points (Optional)

- Validate the recipient address format and the amount (must be positive and greater than 0).
- Show USD value of balance / amount
- Handle loading and error states gracefully (e.g., disable buttons during operations, show error toasts).
- Use a UI library like **TailwindCSS**, **Shadcn UI**, or **Chakra UI** for better styling.
- Ensure mobile responsiveness.

---

## Notes

- You may use **Devnet** for transactions.
- Focus on **code readability**, **component structure**, and **user experience**.
- Think about basic **error handling** and **form validation** — we'll review attention to detail!
