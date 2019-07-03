<?php
namespace Craft;
// This file could be placed into your public_html folder and visited to import a cheese product.
$craft = require '../craft/app/bootstrap.php';
$craft->plugins->loadPlugins();


$criteria = craft()->elements->getCriteria(Calendar_EventModel::ELEMENT_TYPE);

$criteria->calendarId = ['2', '3', '4'];
$criteria->limit = 10;
$criteria->offset = 0;

foreach ($criteria as $calendarEvent)
{

	craft()->eventBrite->updateSalesforceCampaign($calendarEvent);


}


$craft->end();
