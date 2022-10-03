import socket
from threading import Thread


host = 'localhost'
port = 8080

clients = {}
adresses = {}

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind((host, port))


def handle_clients(connection, address):
    name = connection.recv(1024).decode()
    welcome = f"Welcome {name}, If you wish to leave at some point, you can type #quit"
    connection.send(bytes(welcome, "utf8"))
    notification = f"{name} has joined the chat room."
    broadcast(bytes(notification, "utf8"))
    clients[connection] = name

    while True:
        notification = connection.recv(1024)
        if notification != bytes("#quit", "utf8"):
            broadcast(notification, name + ":")
        else:
            connection.send(bytes("#quit", "utf8"))
            connection.close()
            del clients[connection]
            broadcast(bytes(f"{name} has left the chat room"))


def accept_client_connections():
    while True:
        client_connection, client_address = sock.accept()
        print(client_address, "Has Connected")
        client_connection.send("Welcome to the chat room, please type your name.".encode('utf8'))
        adresses[client_connection.recv] = client_address

        Thread(target=handle_clients, args=(client_connection, client_address)).start()


def broadcast(notification, prefix=""):
    for x in clients:
        x.send(bytes(prefix, "utf8") + notification)


if __name__ == '__main__':
    sock.listen(5)
    print("Server is running")
    t1 = Thread(target=accept_client_connections)
    t1.start()
    t1.join()


