from fastapi import FastAPI, Request, HTTPException
from fastapi.templating import Jinja2Templates
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles

from deps_fun.game import check_winner, is_full, create_board
from shemas.move import Move

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def get(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/move")
async def make_move(move: Move):
    global board
    board[move.row][move.col] = move.player
    if check_winner(board, move.player):
        return {"status": "win", "player": move.player}
    elif is_full(board):
        return {"status": "draw"}
    return {"status": "continue"}


@app.get("/reset/{size}")
async def reset_game(size: int):
    global board
    board = create_board(size)
    return {"status": "Game reset"}

board = create_board(3)
