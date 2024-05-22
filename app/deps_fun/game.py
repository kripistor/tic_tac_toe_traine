def create_board(size):
    return [[' ' for _ in range(size)] for _ in range(size)]


def check_winner(board, player):
    size = len(board)
    win_conditions = []

    for i in range(size):
        win_conditions.append(board[i])
        win_conditions.append([board[j][i] for j in range(size)])

    win_conditions.append([board[i][i] for i in range(size)])
    win_conditions.append([board[i][size - 1 - i] for i in range(size)])

    player_line = [player] * size
    return any(condition == player_line for condition in win_conditions)


def is_full(board):
    return all(cell != ' ' for row in board for cell in row)
