from pydantic import BaseModel


class Move(BaseModel):
    row: int
    col: int
    player: str
