// 開いているページのナビバーのリストにスタイルを当てるための関数
function highlightCurrentLink() {
  // 現在のページのURLを取得
  const currentUrl = window.location.href;

  // すべての<a>タグを取得
  const links = document.querySelectorAll('a');

  // それぞれの<a>タグのhrefと現在のURLを比較し、一致する場合にclassを追加
  links.forEach(link => {
    if (link.href === currentUrl) {
      link.classList.add('highlight');
    } else {
      link.classList.remove('highlight');
    }
  });
}

// ページ読み込み時に上記の実行
window.addEventListener('load', highlightCurrentLink);

// ページ遷移時にも上記の実行
window.addEventListener('hashchange', highlightCurrentLink);


//バーガーボタンがクリックされたときのバーガーメニューのでかた

// 1. 上からスライド
// $("#drawer_toggle").click(function(){
// 	$(this).toggleClass("open");
// 	$("#global_nav").slideToggle();
// });

// 2. フェードイン
// $("#drawer_toggle").click(function(){
// 	$(this).toggleClass("open");
// 	$("#global_nav").fadeToggle();
// });

// 3. 横からスライド
// $("#drawer_toggle").click(function(){
//   $(this).toggleClass("open");
//   $("#global_nav").toggleClass("sp_open");
//   $("#navArea").toggleClass("open");
// });
// バニラJavaScriptの場合
// #drawer_toggleがクリックされたときの処理
document.getElementById("drawer_toggle").addEventListener("click", function() {

  // drawer_toggleにopenクラスの切り替え
  this.classList.toggle("open");

  // #global_navにsp_openクラスの切り替え
  document.getElementById("global_nav").classList.toggle("sp_open");

  // #navAreaにopenクラスの切り替え
  document.getElementById("navArea").classList.toggle("open");

});

//maskがクリックされたときクラス名open追加・削除
//(黒い幕部分をクリックしてもメニューを閉じれるようにするため)
// $("#mask").click(function(){
//   $("#drawer_toggle").toggleClass("open");
//   $("#global_nav").toggleClass("sp_open");
//   $("#navArea").toggleClass("open");
// });
// バニラJavaScriptの場合
// #maskがクリックされたときの処理
document.getElementById("mask").addEventListener("click", function() {

  // #drawer_toggleのopenクラスを切り替え
  document.getElementById("drawer_toggle").classList.toggle("open");

  // #global_navのsp_openクラスを切り替え
  document.getElementById("global_nav").classList.toggle("sp_open");

  // #navAreaのopenクラスを切り替え
  document.getElementById("navArea").classList.toggle("open");

});


// スライダーの機能
// slickを起動するためのコードの記述
$(".slider").slick({
  arrows: false, //矢印非表示
  dots: true, //スライダー下にドット(画像枚数分)表示
  autoplay: true //自動スライド
});


//新しいアイテムを追加
// var addArticleForm = document.getElementById('add-article-form');
// var container = document.querySelector('.container');

// addArticleForm.addEventListener('submit', function(event) {
//   event.preventDefault(); // フォームの送信をキャンセルする

//   console.log("追加するボタンが押された");
//   var imageUrl = this.querySelector('#image-url').value; // 画像のURLを取得する
//   var storeName = this.querySelector('#store-name').value; // 店名を取得する
//   var area = this.querySelector('#area').value; // エリアを取得する
//   var menu = this.querySelector('#menu').value; // おすすめメニューを取得する

//   var articleHtml = `
//     <article>
//       <figure><img src="${imageUrl}" alt="${storeName}"></figure>
//       <div class="box_ttl">
//         <h3>${storeName}</h3>
//         <ul class="area">
//           <li>${area}</li>
//         </ul>
//       </div>
//       <p>${menu}</p>
//     <article/>
//   `;

//   var newArticle = document.createElement('div');
//   newArticle.innerHTML = articleHtml;
//   //新しい要素をcontainer要素に追加するために、<div>の子要素である最初の子要素を取得し、
//   //container.insertBefore()メソッドを使用して、この子要素をaddArticleFormフォームの前に挿入します。
//   //これにより、<div>要素が新しい<article>要素として表示されます。

//   container.insertBefore(newArticle.firstChild, addArticleForm); // 新しい <article> 要素を追加する
//   addArticleForm.reset(); // フォームの入力内容をリセットする
// });


// 新しいアイテムを追加するフォームのID取得
const addArticleForm = document.getElementById('add-article-form');
addArticleForm.addEventListener('submit', addArticle);

// 新しいアイテムを追加する関数
function addArticle(e) {
  e.preventDefault(); // フォームの送信をキャンセルする
  
  const newImageUrl = document.getElementById('image-url').value;
  const newStoreName = document.getElementById('store-name').value; 
  const newArea = document.getElementById('area').value;
  const newMenu = document.getElementById('menu').value;
  

  // articleタグの作成
  const newArticle = document.createElement('article');

  // figure:画像のHTMLのひな形を作成
  const newFigure = `<figure><img src="${newImageUrl}" alt="${menu}"></figure>`;
  // store:お店の名前と場所のHTMLのひな形を作成
  const newStore = `
    <div class="box_ttl">
      <h3>${newStoreName}</h3>
      <ul class="area">
        <li>${newArea}</li>
      </ul>
    </div>
  `;
  // content:おすすめのメニューのHTMLのひな形を作成
  const newContent = `<p>${newMenu}</p>`;

  // 上記で作成したHTMLのひな形をarticleタグに格納する
  newArticle.innerHTML = newFigure + newStore + newContent;

  // 新しい削除ボタン
  // 新しく削除ボタンのタグを作成
  const newDeleBtn = document.createElement('button');
  newDeleBtn.textContent = '削除';
  // 新しく削除ボタンの追加（appendChild）
  newArticle.appendChild(newDeleBtn);

  // 削除ボタンにクリックイベントの設定
  newDeleBtn.addEventListener('click', deleteArticle);


  // 一番上にある要素の上に挿入させるための処理
  // div.storesの最初の子要素を取得
  const firstElement = document.querySelector('div.stores').firstElementChild;

  // firstElementの直前にarticleを挿入
  document.querySelector('div.stores').insertBefore(newArticle, firstElement);


  // おまけ：店名の左の線をランダムな色に変える
  const newColor = makeRandColor();
  const box_ttl = document.querySelector('.stores .box_ttl')
  box_ttl.style.borderLeft = `4px solid ${newColor}`;
  console.log(box_ttl);


  alert(`追加するのは、${newArticle}`);

  addArticleForm.reset(); // フォームの入力内容をリセットする
}


// 初期の削除ボタンに対して
// 削除ボタンのタグ取得
const deleteButtons = document.querySelectorAll('.stores button');
// console.log(deleteButtons);
// ループで削除ボタンにクリックイベントを設定
for(let button of deleteButtons) {
  button.addEventListener('click', deleteArticle);
}

// お店情報の削除ボタンの機能
function deleteArticle() {

  // 押された削除ボタンの親要素(article)を取得
  const deleteArticle = this.parentNode; 
  alert(`削除するのは、${deleteArticle}`);

  deleteArticle.remove(); // article要素の削除
}


//検索機能
const searchForm = document.getElementById('search-form');
const articles = document.querySelectorAll('.stores article');

// 検索フォームの送信イベントを監視する
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // フォームの送信をキャンセルする

  const searchKeyword = this.search.value; // 検索キーワードを取得する

  // .storesの<article> 要素の中から検索キーワードにマッチするものを探す
  for (let article of articles) {
    let articleContent = article.textContent; // <article> 要素の中のテキストコンテンツを取得する

    if (articleContent.indexOf(searchKeyword) !== -1) { // 検索キーワードにマッチするかどうかを調べる
      article.style.display = 'block'; // マッチする <article> 要素を表示する
    } else {
      article.style.display = 'none'; // マッチしない <article> 要素を非表示にする
    }
  }
});

// リセットボタンがクリックされたときに、全ての <article> 要素を表示する
searchForm.addEventListener('reset', function() {
  for (let article of articles) {
    article.style.display = 'block'; // 全ての <article> 要素を表示する
  }
});


// おまけ：ランダムな色を出力
const makeRandColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}