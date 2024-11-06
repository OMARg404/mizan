import axios from "axios";

export const baseUrl = "http://localhost:8000/api/v1"; // Backend URL

// Helper function to add authorization headers
const authHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

// User API Endpoints
export const loginUser = async(email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/users/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Login failed");
    }
};

export const createUser = async(userData, token) => {
    try {
        const response = await axios.post(
            `${baseUrl}/users`,
            userData,
            authHeaders(token)
        );
        return response.data;
    } catch (error) {
        throw error.response ?
            error.response.data :
            new Error("Create user failed");
    }
};

export const getAllUsers = async(token) => {
    try {
        const response = await axios.get(`${baseUrl}/users`, authHeaders(token));
        return response.data;
    } catch (error) {
        throw error.response ?
            error.response.data :
            new Error("Failed to fetch users");
    }
};

export const getUserById = async(userId, token) => {
    try {
        const response = await axios.get(
            `${baseUrl}/users/${userId}`,
            authHeaders(token)
        );
        return response.data;
    } catch (error) {
        throw error.response ?
            error.response.data :
            new Error("Failed to fetch user");
    }
};

export const updateUser = async(userId, userData, token) => {
    try {
        const response = await axios.put(
            `${baseUrl}/users/${userId}`,
            userData,
            authHeaders(token)
        );
        return response.data;
    } catch (error) {
        throw error.response ?
            error.response.data :
            new Error("Failed to update user");
    }
};

export const deleteUser = async(userId, token) => {
    try {
        const response = await axios.delete(
            `${baseUrl}/users/${userId}`,
            authHeaders(token)
        );
        return response.data;
    } catch (error) {
        throw error.response ?
            error.response.data :
            new Error("Failed to delete user");
    }
};

// Role API Endpoints
export const getAllRoles = async(token) => {
    const response = await axios.get(`${baseUrl}/roles`, authHeaders(token));
    return response.data;
};

export const getRoleById = async(roleId, token) => {
    const response = await axios.get(
        `${baseUrl}/roles/${roleId}`,
        authHeaders(token)
    );
    return response.data;
};

export const createRole = async(roleData, token) => {
    const response = await axios.post(
        `${baseUrl}/roles`,
        roleData,
        authHeaders(token)
    );
    return response.data;
};

export const updateRole = async(roleId, roleData, token) => {
    const response = await axios.put(
        `${baseUrl}/roles/${roleId}`,
        roleData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteRole = async(roleId, token) => {
    const response = await axios.delete(
        `${baseUrl}/roles/${roleId}`,
        authHeaders(token)
    );
    return response.data;
};

// Permission API Endpoints
export const getAllPermissions = async(token) => {
    const response = await axios.get(
        `${baseUrl}/permissions`,
        authHeaders(token)
    );
    return response.data;
};

export const assignPermission = async(permissionData, token) => {
    const response = await axios.post(
        `${baseUrl}/permissions/assign`,
        permissionData,
        authHeaders(token)
    );
    return response.data;
};

// Notification API Endpoints
export const markNotificationAsRead = async(notificationId, token) => {
    const response = await axios.put(
        `${baseUrl}/notifications/read/${notificationId}`, {}, // You can send an empty body or additional data if needed
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

// Ensure you have this function as well
export const getAllNotifications = async(token) => {
    const response = await axios.get(
        `${baseUrl}/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data; // Make sure this returns the expected notifications array
};


export const createNotification = async(notificationData, token) => {
    const response = await axios.post(
        `${baseUrl}/notifications`,
        notificationData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteNotification = async(notificationId, token) => {
    const response = await axios.delete(
        `${baseUrl}/notifications/${notificationId}`,
        authHeaders(token)
    );
    return response.data;
};

// Administrative Units API
export const getAllAdministrativeUnits = async(token) => {
    const response = await axios.get(
        `${baseUrl}/administrative-units/all`,
        authHeaders(token)
    );
    return response.data;
};

export const createAdministrativeUnit = async(unitData, token) => {
    const response = await axios.post(
        `${baseUrl}/administrative-units/create`,
        unitData,
        authHeaders(token)
    );
    return response.data;
};

export const updateAdministrativeUnit = async(unitId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/administrative-units/update/${unitId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteAdministrativeUnit = async(unitId, token) => {
    const response = await axios.delete(
        `${baseUrl}/administrative-units/delete/${unitId}`,
        authHeaders(token)
    );
    return response.data;
};

// Budget API
export const getAllBudgets = async(token) => {
    const response = await axios.get(
        `${baseUrl}/budgets/all`,
        authHeaders(token)
    );
    return response.data;
};

export const createBudget = async(budgetData, token) => {
    const response = await axios.post(
        `${baseUrl}/budgets/create`,
        budgetData,
        authHeaders(token)
    );
    return response.data;
};

export const updateBudget = async(budgetId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/budgets/update/${budgetId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteBudget = async(budgetId, token) => {
    const response = await axios.delete(
        `${baseUrl}/budgets/delete/${budgetId}`,
        authHeaders(token)
    );
    return response.data;
};

// Budget Requests API
export const getAllBudgetRequests = async(token) => {
    const response = await axios.get(
        `${baseUrl}/budgets/requests/all`,
        authHeaders(token)
    );
    return response.data;
};

export const getBudgetRequestById = async(requestId, token) => {
    const response = await axios.get(
        `${baseUrl}/budgets/requests/${requestId}`,
        authHeaders(token)
    );
    return response.data;
};

export const createBudgetRequest = async(requestData, token) => {
    const response = await axios.post(
        `${baseUrl}/budgets/requests/create`,
        requestData,
        authHeaders(token)
    );
    return response.data;
};

export const updateBudgetRequest = async(requestId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/budgets/requests/update/${requestId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const approveBudgetRequest = async(requestId, token) => {
    const response = await axios.put(
        `${baseUrl}/budgets/requests/approve/${requestId}`, {},
        authHeaders(token)
    );
    return response.data;
};

export const rejectBudgetRequest = async(requestId, token) => {
    const response = await axios.put(
        `${baseUrl}/budgets/requests/reject/${requestId}`, {},
        authHeaders(token)
    );
    return response.data;
};

export const deleteBudgetRequest = async(requestId, token) => {
    const response = await axios.delete(
        `${baseUrl}/budgets/requests/delete/${requestId}`,
        authHeaders(token)
    );
    return response.data;
};

// Cycle API
export const getAllCycles = async(token) => {
    const response = await axios.get(`${baseUrl}/cycles/all`, authHeaders(token));
    return response.data;
};

export const createCycle = async(cycleData, token) => {
    const response = await axios.post(
        `${baseUrl}/cycles/create`,
        cycleData,
        authHeaders(token)
    );
    return response.data;
};

export const updateCycle = async(cycleId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/cycles/update/${cycleId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteCycle = async(cycleId, token) => {
    const response = await axios.delete(
        `${baseUrl}/cycles/delete/${cycleId}`,
        authHeaders(token)
    );
    return response.data;
};

// Expenses API
export const getAllExpenses = async(token) => {
    const response = await axios.get(
        `${baseUrl}/expenses/all`,
        authHeaders(token)
    );
    return response.data;
};

export const createExpense = async(expenseData, token) => {
    const response = await axios.post(
        `${baseUrl}/expenses/create`,
        expenseData,
        authHeaders(token)
    );
    return response.data;
};

export const updateExpense = async(expenseId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/expenses/update/${expenseId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteExpense = async(expenseId, token) => {
    const response = await axios.delete(
        `${baseUrl}/expenses/delete/${expenseId}`,
        authHeaders(token)
    );
    return response.data;
};

// Transfers API
export const getAllTransfers = async(token) => {
    const response = await axios.get(
        `${baseUrl}/transfers/all`,
        authHeaders(token)
    );
    return response.data;
};

export const createTransfer = async(transferData, token) => {
    const response = await axios.post(
        `${baseUrl}/transfers/create`,
        transferData,
        authHeaders(token)
    );
    return response.data;
};

export const updateTransfer = async(transferId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/transfers/update/${transferId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteTransfer = async(transferId, token) => {
    const response = await axios.delete(
        `${baseUrl}/transfers/delete/${transferId}`,
        authHeaders(token)
    );
    return response.data;
};

// Reports API
export const getAllReports = async(token) => {
    const response = await axios.get(
        `${baseUrl}/reports/all`,
        authHeaders(token)
    );
    return response.data;
};

export const createReport = async(reportData, token) => {
    const response = await axios.post(
        `${baseUrl}/reports/create`,
        reportData,
        authHeaders(token)
    );
    return response.data;
};

export const updateReport = async(reportId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/reports/update/${reportId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteReport = async(reportId, token) => {
    const response = await axios.delete(
        `${baseUrl}/reports/delete/${reportId}`,
        authHeaders(token)
    );
    return response.data;
};

// Historical Records API
export const getAllHistoricalRecords = async(token) => {
    const response = await axios.get(
        `${baseUrl}/historical-records/all`,
        authHeaders(token)
    );
    return response.data;
};

export const createHistoricalRecord = async(recordData, token) => {
    const response = await axios.post(
        `${baseUrl}/historical-records/create`,
        recordData,
        authHeaders(token)
    );
    return response.data;
};

export const updateHistoricalRecord = async(recordId, updateData, token) => {
    const response = await axios.put(
        `${baseUrl}/historical-records/update/${recordId}`,
        updateData,
        authHeaders(token)
    );
    return response.data;
};

export const deleteHistoricalRecord = async(recordId, token) => {
    const response = await axios.delete(
        `${baseUrl}/historical-records/delete/${recordId}`,
        authHeaders(token)
    );
    return response.data;
};