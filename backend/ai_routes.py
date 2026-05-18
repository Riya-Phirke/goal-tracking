from fastapi import APIRouter

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.get("/performance-summary/{employee_id}")
def generate_summary(employee_id: int):

    return {

        "summary":

        "Performance is improving steadily. "
        "Goals are progressing well and "
        "manager engagement is healthy."
    }