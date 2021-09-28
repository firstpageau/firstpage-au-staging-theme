<?php
// Blog Home
$context = Timber::get_context();

$context['posts'] = new Timber\PostQuery();
$context['sumome'] = true;

$templates = array( pll_current_language() . '-' . 'blog.twig' );
Timber::render( $templates, $context );