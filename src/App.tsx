import React, { useEffect, useState } from 'react'
import  "./App.css"

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  // <Todo[]>はTodoの型指定 Todoの配列として持っておく 
  //  useState([])は空で用意している 
  // ===> 空の配列に何が入っていくものを、Todoの型指定をしたもののみ入るように指定している
  const [filter, setFilter] = useState('notStarted')
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  type Todo = {
    inputValue: string; //入力したタスク
    id: number; //どのタスクなのかを認識するためのid
    checked: boolean;  //完了or未完了かの判定
    status: string; //タスクの状態を表す
  };
  // Todo変数の型を指定することで、エラーを見つけやすくする(typeScriptの強み) ※型ミスを防ぐ

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value); //input情報をどうやって取得出来るのかを確認する 無事取得できたこと確認↓のコード記入
    setInputValue(e.target.value)
    // inputValueに格納される。格納されたinputValueをtodoオブジェクトの中に入れる　格納されるコードはonSubmitへ
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 送信ボタンを押した時にリロードされないためのコード

    // 新しいTodoを作成
    const newTodo: Todo = { // :TodoとすることでTodoの型タイプを指定することになる
      inputValue: inputValue, //右側のinputValueはuseStateで保持している変数
      id: todos.length, //todos配列の長さ
      checked: false, //新規作成の場合は未完了からスタートするためfalseスタート
      status: 'notStarted', //未完了スタート
    };

    // 更新されたTodoリスト デフォルトが配列のため、[]とする
    setTodos([newTodo, ...todos]); 
    // 新しいnewTodoに既存(現在)のtodosリストを展開する
    setInputValue('');
    // 新しいtodoを追加したのちは空にする
  };

  // const handleStatusTodo = () => {
  //   setTodos([...todos, { 
  //     id: number, 
  //     title: inputValue, 
  //     status: 'notStarted' }])
  //   setTodoId(todoId + 1)
  //   setInputValue('');
  // }
  // ※これはいらない？

    // const handleEdit = (id: number, inputValue: string) => {
    //   // idとinputValueという適当に引数を決める 型指定しているため、パラメーターエラーがでることがある。id:number, inputValue:stringと書いてエラー解消する
    //   const newTodos = todos.map((todo) => {
    //     // (todo)はひとつひとつをtodoと宣言する
    //     if(todo.id === id) {
    //       // 今見ているtodoのid(if文の中のtodo.id)が、id(===idのid)に等しければ変更を加える idはhandleEdit(todo.id, e.target.value)のtodo.idのこと
    //       todo.inputValue = inputValue;
    //       // inputValueは今編集している文字列のこと
    //     }
    //     return todo;
    //   });

    //   setTodos(newTodos);
    // };

    const handleEdit = (id: number, inputValue: string) => {
      const newTodos = todos.map((todo) => 
      todo.id === id ? {...todo, inputValue: inputValue} :todo
      )
      setTodos(newTodos)
    }


    // const handleChecked = (id: number, checked: boolean) => {
    //   const newTodos = todos.map((todo) => {
    //     if(todo.id === id) {
    //       // 今見ているtodoのid(if文の中のtodo.id)が、id(===idのid)に等しければ変更を加える idはhandleChecked(todo.id, todo.checked)のtodo.idのこと
    //       todo.checked = !checked;
    //       // チェック状態を反転させる
    //     }
    //     return todo;
    //   });

    //   setTodos(newTodos);
    // };

      const handleChecked = (id: number, checked: boolean) => {
      const newTodos = todos.map((todo) => 
      todo.id === id ? {...todo, checked: !checked} : todo
      )
      setTodos(newTodos)
    }

    const handleStatusChange = (id: number, status: string) => {
      const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: status } : todo
    )
    // リストに含まれるtodoのid === 該当のtodoのid ? {更新したい情報} : todo
    
    setTodos(newTodos)
    }
    

    const handleDelete = (id:number) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      // filterで全てのtodo.idを見に行く　条件式がtrueになったものだけ残す
      // !== idのidは削除対象のid (false)
      // todo.idは全てのid をチェックし、!==で合ってないid(削除対象外のid /true)を残す=>filter関数
      setTodos(newTodos);
    };

    useEffect(() => {
      const filteringTodos = () => {
        switch (filter) {
          case 'notStarted': 
          setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'))
          break
          case 'inProgress':
          setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
          break
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
          break
          default: setFilteredTodos(todos)}
        }
        filteringTodos()
      },[filter, todos])
    // どのタイミングで処理をしたいか　filterとtodosが更新された時

  return (
    <div className='App'>
      <h2>Todoリスト（中級編課題）</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* onSubmit formに何かを打ち込んだときにどういう作業をするのか エンターキーまたは送信ボタンを押したら反映する*/}
        <input 
          type="text" 
          // {/* todoリストのタスクを打ち込むところ */}
          value={inputValue}
          onChange={(e) => handleAddFormChange(e) }
          // inputに文字を打ち込むたびに呼ばれるプロパティ inputValueを取得する handleAddFormChange(e)の(e)はevent情報
          className='inputText'
        />
        <input type="submit" 
          // 送信ボタン typeをsubmitにするだけでボタンになる
          value="作成"
          className='submitButton' 
          style={{margin: "0 10px"}}
        />
        <select value ={filter} onChange={(e) => setFilter(e.target.value)} className='status'>
              <option value="all">すべて</option>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
        </select>
      </form>
      {/* Todoリストを追加するためのformタグ */}

      <ul className='todoList'>
        {/* 新規作成したtodo配列をmap関数で展開する */}
        {filteredTodos.map((todo) => (
          // ↑のtodoが５つあればliタグが５つ生成される
          <li key={todo.id}>
            {/* keyをつけて割り振る */}
            {/* {todo.inputValue} */}
            {/* newTodoの中身のinputValueを見に行く */}
            <input 
              type="text" 
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              // inputに文字を打ち込むたびに呼ばれるプロパティ
              // どのタスクを編集するのか指定するためにtodo.idをつける e.target.valueと２つの引数をとる
              className='inputText'
              value={todo.inputValue}
              // inputタグの中に値を入れる
              disabled={todo.checked}
              // 入力できない状態にする trueだと入力不可
            />
            <input 
              type="checkbox" 
              onChange={(e) => handleChecked(todo.id, todo.checked)}
              // どのタスクかを指定するためのtodo.id と今のcheckedの状態を確認するtodo.checked
            />
            
            <select value={todo.status} className='status'
              onChange={(e) => handleStatusChange(todo.id, e.target.value)}>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button className='deleteButton' onClick={() => handleDelete(todo.id)}>消</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

