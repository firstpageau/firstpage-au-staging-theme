<?php
// Default Pages
$context = Timber::get_context();

$context['post'] = new Timber\Post();

$templates = array( pll_current_language() . '-' . 'page.twig' );
Timber::render( $templates, $context );
