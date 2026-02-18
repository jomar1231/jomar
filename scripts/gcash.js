function sendMoney() {
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;

  if (name === "" || amount === "") {
    alert("Please fill up all fields");
    return;
  }

  document.getElementById("rName").innerText = name;
  document.getElementById("rAmount").innerText = amount;
  document.getElementById("ref").innerText = "GC" + Math.floor(Math.random() * 1000000000);
  document.getElementById("date").innerText = new Date().toLocaleString(); 
  document.getElementById("receipt").classList.remove("hidden");
}


const product = {
  id: crypto.randomUUID(),
  name: "Nike Shoes",
  price: 2999
};

console.log(product);