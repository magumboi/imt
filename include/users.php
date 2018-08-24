<?php
include ('resultados.php');
$Resultados = new Resultados();
session_start();
if (!isset($_SESSION['noice']))
{
    echo "<meta http-equiv='refresh' content='0;url=include/'>";
}

$rows = $Resultados -> getusers();


echo '<table class="table table-hover">
    <thead>
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Added</th>
    </tr>
    </thead>
    <tbody>';

foreach($rows as $row) {
    echo $row['field1'] . ' ' . $row['field2'];

    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
    </tr>
    <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
    </tr>
    <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
    </tr>
    </tbody>
</table>

