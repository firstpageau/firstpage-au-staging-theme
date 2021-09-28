<?php
// Home Page
$context = Timber::get_context();

$templates = array( pll_current_language() . '-' . 'home.twig' );
Timber::render( $templates, $context );