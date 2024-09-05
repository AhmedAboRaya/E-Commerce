# E-Commerce System

## Overview

This project is an E-Commerce System that allows users and admins to perform various actions related to purchases, account management, and product management.

## Features

### User Features
- **Checkout**: Users can complete the checkout process for products.
- **Send Message to Admin**: Users can send messages to the admin.
- **View Purchases**: Users can view their purchases and check the status of each purchase.
- **Create Account**: Users can create an account to access the system.

### Admin Features
- **Delete Product**: Admins can delete products from the system.
- **Edit Product**: Admins can edit product details.
- **Manage Messages**: Admins can view and delete user messages.
- **Add Product**: Admins can add new products, including categorizing them as Mobile or Laptop.
- **Create Admin Account**: Admins can create additional admin accounts.
- **Manage Accounts**: Admins can view all accounts (both admin and user) and delete any account if necessary.
- **View All Purchases**: Admins can see all purchases made and change the status of purchases. Admins can also filter purchases by status.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/AhmedAboRaya/E-Commerce.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd your-repository
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Run the project:**
    - Start the local server:
      ```bash
      npm start
      ```

5. **Run the JSON servers for API mockup:**
    - For checkout data:
      ```bash
      npx json-server --watch data/checkout.json --port 9000
      ```

    - For messages data:
      ```bash
      npx json-server --watch data/messages.json --port 5000
      ```

    - For products data:
      ```bash
      npx json-server --watch data/products.json --port 8000
      ```

    - For users data:
      ```bash
      npx json-server --watch data/users.json --port 7000
      ```

## API Endpoints

- **GET /checkout**: Retrieve all checkout records.
- **POST /checkout**: Create a new checkout record.
- **GET /products/:id**: Retrieve product details by ID.

## Usage

- **For Users**:
  - Access the checkout page to complete purchases.
  - Send messages to admins from the messaging section.
  - View purchase history and check purchase statuses from the purchase history section.
  - Create and manage your account from the account management page.

- **For Admins**:
  - Manage products, including adding, editing, and deleting products.
  - Manage user messages and delete them if necessary.
  - Create and manage admin accounts.
  - View and manage all accounts and purchases. Change the status of purchases and filter them as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact me at [ahmedaboraya399@gmail.com](mailto:ahmedaboraya399@gmail.com).
