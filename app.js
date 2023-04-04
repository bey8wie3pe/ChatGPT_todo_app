const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL接続設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shou0810',
  database: 'todo_app'
});

// DB接続
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// タスク一覧ページ
app.get('/', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.render('index', { tasks: results });
  });
});

// タスク追加処理
app.post('/add', (req, res) => {
  const taskName = req.body.taskName;
  connection.query('INSERT INTO tasks (task_name) VALUES (?)', [taskName], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// タスク削除処理
app.post('/delete', (req, res) => {
  const taskId = req.body.taskId;
  connection.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// サーバー起動
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
