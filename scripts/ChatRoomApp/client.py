import socket
from tkinter import Tk, StringVar, Frame, Scrollbar, Listbox, RIGHT, LEFT, BOTH, Y, mainloop, Label, Entry, Button, END
from threading import Thread


host = 'localhost'
port = 8080


def receive():
    while True:
        try:
            msg = socket_conn.recv(1024).decode('utf8')
            msg_list.insert(END, msg)
        except:
            print("Error receiving messages")


def send():
    msg = my_msg.get()
    my_msg.set("")
    socket_conn.send(bytes(msg, 'utf8'))
    if msg == "#quit":
        socket_conn.close()
        window.close()


def on_closing():
    my_msg.set("#quit")
    send()


window = Tk()
window.title("Chat Room Application")
window.configure(bg="navy")

message_frame = Frame(window, height=100, width=100, bg='black')
message_frame.pack()

my_msg = StringVar()
my_msg.set("")

scroll_bar = Scrollbar(message_frame)
msg_list = Listbox(message_frame, height=15, width=100, bg="black", yscrollcommand=scroll_bar.set)
scroll_bar.pack(side=RIGHT, fill=Y)
msg_list.pack(side=LEFT, fill=BOTH)
msg_list.pack()

label = Label(window, text="Enter a message", fg="black", font='Aerial', bg='gray')
label.pack()

entry_field = Entry(window, textvariable=my_msg, fg='white', width=50)
entry_field.pack()

send_button = Button(window, text="Send", font='Aerial', fg='black', command=send)
send_button.pack()

quit_button = Button(window, text="Quit", font='Aerial', fg='black', command=on_closing)
quit_button.pack()


socket_conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket_conn.connect((host, port))

receive_thread = Thread(target=receive)
receive_thread.start()

mainloop()
