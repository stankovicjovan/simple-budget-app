import { Container, Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import classes from "./App.module.css";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { BudgetsProvider, useBudgets } from "./contexts/BudgetContexts";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  const { budgets, getBudgetExpenses } = useBudgets();

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddBudgetModal(true);
            }}
          >
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <div className={classes.card}></div>
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );

          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              gray
            ></BudgetCard>
          );
        })}
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
    </>
  );
}

export default App;
