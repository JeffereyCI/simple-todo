document.addEventListener('DOMContentLoaded', () => {
  const todoForm  = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList  = document.getElementById('todo-list');

  function addTodo(todoText) {
    const listItem = document.createElement('li');

    const todoTextSpan = document.createElement('span');
    todoTextSpan.textContent = todoText;
    todoTextSpan.addEventListener('click', () => {
      if (!listItem.classList.contains('editing')) {
        listItem.classList.toggle('completed');
      }
    });
    listItem.appendChild(todoTextSpan);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todoText;
    listItem.appendChild(editInput);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.classList.add('delete-btn');
    actionsDiv.appendChild(deleteButton);

    listItem.appendChild(actionsDiv);
    todoList.appendChild(listItem);
  }

  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText) {
      addTodo(todoText);
      todoInput.value = '';
    } else {
      alert('Tugas tidak boleh kosong!');
    }
  });

  todoList.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        const listItem = e.target.closest('li');
        listItem.remove();
      }
    }

    if (e.target.classList.contains('edit-btn')) {
      const listItem = e.target.closest('li');

      if (listItem.classList.contains('completed')) {
        alert('Tugas yang sudah selesai tidak bisa diedit.');
        return;
      }

      const todoTextSpan = listItem.querySelector('span');
      const editInput    = listItem.querySelector('input[type=\"text\"]');
      const editButton   = e.target;

      if (listItem.classList.contains('editing')) {
        const newText = editInput.value.trim();
        if (newText) {
          todoTextSpan.textContent = newText;
          listItem.classList.remove('editing');
          editButton.textContent = 'Edit';
          editInput.style.display = 'none';
          todoTextSpan.style.display = 'block';
        } else {
          alert('Tugas tidak boleh kosong setelah diedit!');
        }
      } else {
        listItem.classList.add('editing');
        editInput.value = todoTextSpan.textContent;
        editInput.style.display = 'block';
        todoTextSpan.style.display = 'none';
        editButton.textContent = 'Simpan';
        editInput.focus();

        editInput.addEventListener(
          'keypress',
          function (event) {
            if (event.key === 'Enter') editButton.click();
          },
          { once: true }
        );
      }
    }
  });
});
